import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { MatDialog } from '@angular/material/dialog';
import { ContactsService } from '../services/contacts.service';
import { DialogEditContactComponent } from "./dialog-edit-contact/dialog-edit-contact.component";
import { DialogAddContactComponent } from "./dialog-add-contact/dialog-add-contact.component";
import { ShowContactComponent} from "./show-contact/show-contact.component";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('slideInOut', [
      state('out', style({
        transform: 'translateX(100%)',
        display: 'none'
      })),
      state('in', style({
        transform: 'translateX(0)',
        display: 'block'
      })),
      transition('out => in', animate('500ms ease-in')),
      transition('in => out', animate('500ms ease-out'))
    ])
  ]
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];

  constructor(public dialog: MatDialog, private contactsService: ContactsService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactsService.getContacts().subscribe(data => {
      let lastInitial = '';
      this.contacts = data.sort((a, b) => a.name.localeCompare(b.name)); // Sort contacts alphabetically
      this.contacts.forEach(contact => {
        const currentInitial = contact.name[0].toUpperCase(); // Get current initial
        if (currentInitial === lastInitial) {
          // If current initial is the same as the last one, set it to an empty string
          contact.initial = '';
        } else {
          // Otherwise, set it to the current initial and update lastInitial
          contact.initial = currentInitial;
          lastInitial = currentInitial;
        }
      });
      console.log('Contacts:', this.contacts);
    }, error => {
      console.error('Error fetching contacts:', error);
    });
  }

  clickContact(index: number) {
    if (window.innerWidth <= 1200) {
      this.showContact(this.contacts[index]);
    } else {
      this.contacts.forEach((c, i) => {
        if (i !== index) c.isClicked = false;
      });
      this.contacts[index].isClicked = !this.contacts[index].isClicked;
    }
  }

  showContact(contact: any) {
    const dialogRef = this.dialog.open(ShowContactComponent, {
      width: '400px',
      height: '600px',
      data: contact
    });
  }

  removeContact(index: number) {
    const contact = this.contacts[index];
    this.contactsService.deleteContact(contact.id).subscribe(() => {
      this.contacts.splice(index, 1);
    });
  }

  openDialog(contact: any): void {
    const width = window.innerWidth < 748 ? '400px' : '850px';
    const height = window.innerWidth < 748 ? '850px' : '400px';

    const dialogRef = this.dialog.open(DialogEditContactComponent, {
      width: width,
      height: height,
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.updateContact(result).subscribe(() => {
          this.getContacts();
        });
      }
    });
  }

  openAddDialog(): void {
    const width = window.innerWidth < 748 ? '400px' : '850px';
    const height = window.innerWidth < 748 ? '850px' : '400px';

    const dialogRef = this.dialog.open(DialogAddContactComponent, {
      width: width,
      height: height,
      data: { name: '', email: '', phone: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.addContact(result).subscribe(() => {
          this.getContacts();
        });
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(part => part[0].toUpperCase()).join('');
  }
}
