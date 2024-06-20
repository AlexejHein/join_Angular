import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';
import { DialogEditContactComponent} from "../dialog-edit-contact/dialog-edit-contact.component";

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
    public dialog: MatDialog
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  openDialog(data: any) {
    const width = window.innerWidth < 748 ? '400px' : '850px';
    const height = window.innerWidth < 748 ? '850px' : '400px';

    const dialogRef = this.dialog.open(DialogEditContactComponent, {
      width: width,
      height: height,
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.updateContact(result).subscribe(() => {
          this.dialogRef.close();
        });
      }
    });
  }

  removeContact() {
    if (this.data && this.data.id) {
      this.contactsService.deleteContact(this.data.id).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      console.error('No contact data available');
    }
  }
}
