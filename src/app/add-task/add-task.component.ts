import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
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

  defaultButtonStyle = { background: '', color: '', iconColor: '' };
  priorityStyles = {
    urgent: { background: 'red', color: '#ffffff', iconColor: '#ffffff' },
    medium: { background: 'yellow', color: '#ffffff', iconColor: '#ffffff' },
    low: { background: 'green', color: '#ffffff', iconColor: '#ffffff' }
  };

  buttonStyles = {
    urgent: { ...this.defaultButtonStyle },
    medium: { ...this.defaultButtonStyle },
    low: { ...this.defaultButtonStyle }
  };

  selectedPriority = '';

  constructor() { }

  changeButtonColor(priority: 'urgent' | 'medium' | 'low') {
    this.resetButtonColors();
    this.buttonStyles[priority] = { ...this.priorityStyles[priority] };
    this.selectedPriority = priority;
  }

  resetButtonColors() {
    this.buttonStyles = {
      urgent: { ...this.defaultButtonStyle },
      medium: { ...this.defaultButtonStyle },
      low: { ...this.defaultButtonStyle }
    };
  }
  ngOnInit() {
    this.resetButtonColors();

  }

  clearFields() {
    this.title = '';
    this.description = '';
    this.category = '';
    this.contactsLst = '';
  }



}
