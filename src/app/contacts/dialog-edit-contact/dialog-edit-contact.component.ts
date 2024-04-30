import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.css']
})
export class DialogEditContactComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);  // Daten des Kontakts anzeigen, um sicherzustellen, dass sie korrekt übergeben wurden
  }

}
