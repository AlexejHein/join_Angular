import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('slideOutRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition(':leave', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ContactsComponent {
  contacts = [
    {'name': "Alexej Hein", 'email': "test@aol.de", 'phone': "123456789"},
    {'name': "Max Mustermann", 'email': "max@ma.de", 'phone': "987654321"},
    {'name': "Peter Pan", 'email': "Peter@fr.de", 'phone': "456789123"},
    {'name': "Hans Wurst", 'email': "HUe@ai.de", 'phone': "789123456"},
  ]

  removeContact(index: number) {
    this.contacts.splice(index, 1);
  }
}
