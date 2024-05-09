import { Component, OnInit } from '@angular/core';

interface Task {
  title: string;
  description: string;
  category: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  subtasks: Subtask[];
}

interface Subtask {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  value: any;
  newSubtaskName = '';

  contacts = [
    { id: 1, name: "Alexej Hein", email: "test@aol.de", phone: "123456789", isClicked: false },
    { id: 2, name: "Max Mustermann", email: "max@ma.de", phone: "987654321", isClicked: false },
    { id: 3, name: "Peter Pan", email: "Peter@fr.de", phone: "456789123", isClicked: false },
    { id: 4, name: "Hans Wurst", email: "HUe@ai.de", phone: "789123456", isClicked: false }
  ];

  title = '';
  description = '';
  category = '';
  contactsLst = '';
  dueDate = '';

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
  subtasks: Subtask[] = [];

  errorMessages: any = {
    title: '',
    description: '',
    category: '',
    assignedTo: '',
    dueDate: '',
    priority: ''
  };

  constructor() { }

  ngOnInit() {
    this.resetButtonColors();
  }

  changeButtonColor(priority: 'urgent' | 'medium' | 'low') {
    this.resetButtonColors();
    this.buttonStyles[priority] = { ...this.priorityStyles[priority] };
    this.selectedPriority = priority;
    this.errorMessages.priority = '';
  }

  resetButtonColors() {
    this.buttonStyles = {
      urgent: { ...this.defaultButtonStyle },
      medium: { ...this.defaultButtonStyle },
      low: { ...this.defaultButtonStyle }
    };
  }

  clearFields() {
    this.title = '';
    this.description = '';
    this.category = '';
    this.contactsLst = '';
    this.dueDate = '';
    this.newSubtaskName = '';
    this.selectedPriority = '';
    this.subtasks = [];
    this.errorMessages = {
      title: '',
      description: '',
      category: '',
      assignedTo: '',
      dueDate: '',
      priority: ''
    };
    this.resetButtonColors();
  }

  addSubtask() {
    if (this.newSubtaskName.trim()) {
      this.subtasks.push({ name: this.newSubtaskName, completed: false });
      this.newSubtaskName = '';
    }
  }

  removeSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  validateInputs(): boolean {
    let isValid = true;
    this.errorMessages.title = this.title.trim() ? '' : 'Title is required';
    this.errorMessages.description = this.description.trim() ? '' : 'Description is required';
    this.errorMessages.category = this.category.trim() ? '' : 'Category is required';
    this.errorMessages.assignedTo = this.contactsLst.trim() ? '' : 'Assigned to is required';
    this.errorMessages.dueDate = this.dueDate.trim() ? '' : 'Due date is required';
    this.errorMessages.priority = this.selectedPriority ? '' : 'Priority is required';

    for (const key in this.errorMessages) {
      if (this.errorMessages[key]) {
        isValid = false;
      }
    }

    return isValid;
  }

  createTask() {
    if (this.validateInputs()) {
      const task: Task = {
        title: this.title,
        description: this.description,
        category: this.category,
        assignedTo: this.contactsLst,
        dueDate: this.dueDate,
        priority: this.selectedPriority,
        subtasks: [...this.subtasks]
      };

      console.log('Created Task:', task);
      this.clearFields();  // Optional: Felder zurücksetzen nach dem Erstellen
    }
  }
}
