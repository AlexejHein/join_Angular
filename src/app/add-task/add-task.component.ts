import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  value: any;

  contacts = [
    {'id': 1, 'name': "Alexej Hein", 'email': "test@aol.de", 'phone': "123456789", 'isClicked': false},
    {'id': 2, 'name': "Max Mustermann", 'email': "max@ma.de", 'phone': "987654321", 'isClicked': false},
    {'id': 3, 'name': "Peter Pan", 'email': "Peter@fr.de", 'phone': "456789123", 'isClicked': false},
    {'id': 4, 'name': "Hans Wurst", 'email': "HUe@ai.de", 'phone': "789123456", 'isClicked': false},
  ];
  title = '';
  description = '';
  category = '';
  contactsLst = '';

  clearFields() {
    this.title = '';
    this.description = '';
    this.category = '';
    this.contactsLst = '';
  }



}
