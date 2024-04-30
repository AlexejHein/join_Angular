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
              public dialogRef: MatDialogRef<DialogEditContactComponent>
  ) {
    this.contactData = data;
    console.log(data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
