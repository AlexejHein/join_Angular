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
  color: string = this.getRandomColor();

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

  getRandomColor(): string {
    const getRandomNumber = () => Math.floor(Math.random() * 256);
    const color = [getRandomNumber(), getRandomNumber(), getRandomNumber()]
      .map(num => num.toString(16).padStart(2, '0'))
      .join('');
    return `#${color}`;
  }

  createContact(): void {
    const newContact = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      color: this.color
    };
    this.dialogRef.close(newContact);
  }
}
