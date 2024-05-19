import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.css']
})
export class DialogEditContactComponent {
  contactForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditContactComponent>,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveContact(): void {
    if (this.contactForm.valid) {
      const updatedContact = {
        ...this.data,
        ...this.contactForm.value
      };
      this.dialogRef.close(updatedContact);
    }
  }
}
