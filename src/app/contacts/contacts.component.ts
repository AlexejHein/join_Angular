import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('slideInOut', [
      state('out', style({
        transform: 'translateX(100%)',
        display: 'none'
      })),
      state('in', style({
        transform: 'translateX(0)',
        display: 'block'
      })),
      transition('out => in', animate('500ms ease-in')),
      transition('in => out', animate('500ms ease-out'))
    ])
  ]
})
export class ContactsComponent {
  contacts = [
    {'name': "Alexej Hein", 'email': "test@aol.de", 'phone': "123456789", 'isClicked': false},
    {'name': "Max Mustermann", 'email': "max@ma.de", 'phone': "987654321", 'isClicked': false},
    {'name': "Peter Pan", 'email': "Peter@fr.de", 'phone': "456789123", 'isClicked': false},
    {'name': "Hans Wurst", 'email': "HUe@ai.de", 'phone': "789123456", 'isClicked': false},
  ];

  clickContact(index: number) {
    // Setze alle isClicked auf false und dann den ausgewählten auf true
    this.contacts.forEach((c, i) => {
      if (i !== index) c.isClicked = false;
    });
    this.contacts[index].isClicked = !this.contacts[index].isClicked;
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
  }
}
