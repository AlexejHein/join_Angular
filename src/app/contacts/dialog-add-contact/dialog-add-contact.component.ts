import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.css']
})
export class DialogAddContactComponent {
  name: string = '';
  email: string = '';
  phone: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddContactComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  clearForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
  }

  createContact(): void {
    const newContact = {
      name: this.name,
      email: this.email,
      phone: this.phone
    };
    this.dialogRef.close(newContact);
  }
}
