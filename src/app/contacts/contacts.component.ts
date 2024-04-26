import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts = [
    {'name': "Alexej Hein", 'email': "test@aol.de", 'phone': "123456789"},
    {'name': "Max Mustermann", 'email': "max@ma.de", 'phone': "987654321"},
    {'name': "Peter Pan", 'email': "Peter@fr.de", 'phone': "456789123"},
    {'name': "Hans Wurst", 'email': "HUe@ai.de", 'phone': "789123456"},
  ]
}
