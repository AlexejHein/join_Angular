import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css']
})
export class ShowContactComponent {
  private _name: any;
  protected i: any;

  contacts: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShowContactComponent>,
    private contactsService: ContactsService,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialog(data: any) {
    this.data = data;

  }

  removeContact(i: any) {
    const contact = this.contacts[i];
    this.contactsService.deleteContact(contact.id).subscribe(() => {
      this.contacts.splice(i, 1);
    });

  }
}
