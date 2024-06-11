import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ContactsService } from '../services/contacts.service';
import { Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import {NewCategoryComponent} from "./new-category/new-category.component";
import { CategoryResetService} from "../services/category-reset.service";


interface Subtask {
  name: string;
  completed: boolean;
}

interface Category {
  name: string;
  color: string;
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  categories: Category[] = [{ name: 'Sales', color: '#FF0000' }, { name: 'Backoffice', color: '#00FF00' }, { name: 'New Category', color: '' }];


  newSubtaskName = '';
  contacts: any[] = [];
  title = '';
  description = '';
  category = '';
  assignedTo: number | null = null;
  categoryColor = '';
  dueDate: Date | null = null;

  defaultButtonStyle = {background: '#f0f0f0', color: '#000', iconColor: '#000'};
  priorityStyles = {
    urgent: {background: 'red', color: '#ffffff', iconColor: '#ffffff'},
    medium: {background: 'yellow', color: '#000000', iconColor: '#000000'},
    low: {background: 'green', color: '#ffffff', iconColor: '#ffffff'}
  };

  buttonStyles = {
    urgent: {...this.defaultButtonStyle},
    medium: {...this.defaultButtonStyle},
    low: {...this.defaultButtonStyle}
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

  constructor(private taskService: TaskService,
              private contactsService: ContactsService,
              private router: Router,
              private dialog: MatDialog,
              private categoryResetService: CategoryResetService
              ) {}

  ngOnInit() {
    this.resetButtonColors();
    this.loadContacts();
    this.categoryResetService.resetCategory$.subscribe(() => {
      this.resetCategorySelection();
    });
  }

  resetCategorySelection(): void {
    this.category = ''; // Setzen Sie dies auf Ihren Standardwert
  }

  addNewCategory(): void {
    if (this.category === 'New Category') {
      const dialogRef = this.dialog.open(NewCategoryComponent, {
        width: '350px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed');
          const newCategory: Category = {name: result.name, color: result.color};
          this.categories.push(newCategory);
          this.category = newCategory.name;
          this.categoryColor = newCategory.color;
        }
      });
    }
  }

  loadContacts() {
    this.contactsService.getContacts().subscribe(data => {
      this.contacts = data;
    }, error => {
      console.error('Error fetching contacts:', error);
    });
  }

  changeButtonColor(priority: 'urgent' | 'medium' | 'low') {
    this.resetButtonColors();
    this.buttonStyles[priority] = {...this.priorityStyles[priority]};
    this.selectedPriority = priority;
    this.errorMessages.priority = '';
  }

  resetButtonColors() {
    this.buttonStyles = {
      urgent: {...this.defaultButtonStyle},
      medium: {...this.defaultButtonStyle},
      low: {...this.defaultButtonStyle}
    };
  }

  clearFields() {
    this.title = '';
    this.description = '';
    this.category = '';
    this.assignedTo = null;
    this.dueDate = null;
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
      this.subtasks.push({name: this.newSubtaskName, completed: false});
      this.newSubtaskName = '';
    }
  }

  removeSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  validateInputs(): boolean {
    let isValid = true;
    const dueDateString = this.dueDate ? String(this.dueDate).trim() : '';

    this.errorMessages.title = this.title.trim() ? '' : 'Title is required';
    this.errorMessages.description = this.description.trim() ? '' : 'Description is required';
    this.errorMessages.category = this.category.trim() ? '' : 'Category is required';
    this.errorMessages.assignedTo = this.assignedTo !== null ? '' : 'Assigned to is required';
    this.errorMessages.dueDate = dueDateString ? '' : 'Due date is required';
    this.errorMessages.priority = this.selectedPriority ? '' : 'Priority is required';

    for (const key in this.errorMessages) {
      if (this.errorMessages[key]) {
        isValid = false;
      }
    }

    return isValid;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero
    const day = ('0' + date.getDate()).slice(-2); // add leading zero
    return `${year}-${month}-${day}`;
  }



  createTask() {
    if (this.validateInputs()) {
      // Find the selected category object
      const selectedCategory = this.categories.find(category => category.name === this.category);

      const task: any = {
        title: this.title,
        description: this.description,
        category: this.category,
        categoryColor: selectedCategory, // Use the selected category object
        assigned_to: this.assignedTo!,
        due_date: this.dueDate instanceof Date ? this.formatDate(this.dueDate) : '',
        priority: this.selectedPriority,
        status: 'todo',
        subtasks: this.subtasks.map(subtask => ({
          name: subtask.name,
          completed: subtask.completed
        }))
      };
      console.log('Task data to be sent:', task);
      this.taskService.addTask(task).subscribe(() => {
        console.log('Task created successfully');
        console.log('Task data:', task);
        this.clearFields();
        this.router.navigate(['/board']).then(r => {});
      }, (error: any) => {
        console.error('Error creating task:', error);
      });
    }
  }
}
