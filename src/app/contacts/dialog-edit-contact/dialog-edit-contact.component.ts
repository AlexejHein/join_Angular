import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.css']
})
export class DialogEditContactComponent {
  contactData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogEditContactComponent>  // MatDialogRef injizieren
  ) {
    this.contactData = data;
    console.log(data);  // Daten des Kontakts anzeigen, um sicherzustellen, dass sie korrekt übergeben wurden
  }

  closeDialog() {
    this.dialogRef.close();  // Dialog schließen
  }

}
