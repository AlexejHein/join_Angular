import {Component, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { ContactsService } from '../services/contacts.service';
import { Task } from '../models/Task';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  private taskDeletedSubscription: Subscription | undefined;
  contacts: Contact[] = [];


  tasks: {
    todo: Task[];
    inProgress: Task[];
    awaitingFeedback: Task[];
    done: Task[];
  } = {
    todo: [],
    inProgress: [],
    awaitingFeedback: [],
    done: []
  };

  constructor(private dialog: MatDialog,
              private taskService: TaskService,
              private contactService: ContactsService,
              ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.getContacts();
    console.log('Contacts:', this.contacts);
    this.taskService.taskDeleted.subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
    if (this.taskDeletedSubscription) {
      this.taskDeletedSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      console.log('Tasks received from backend:', data);
      this.tasks.todo = data.filter(task => task.status === 'todo');
      this.tasks.inProgress = data.filter(task => task.status === 'inProgress');
      this.tasks.awaitingFeedback = data.filter(task => task.status === 'awaitingFeedback');
      this.tasks.done = data.filter(task => task.status === 'done');
      console.log('Tasks after categorizing:', this.tasks);
    }, error => {
      console.error('Error loading tasks:', error);
    });
  }

  getColor(name: string): string {
    const contact = this.contacts.find(contact => contact.name === name);
    return contact ? contact.color : 'defaultColor';
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
      console.log('Contacts:', this.contacts);
    }, (error: any) => {
      console.error('Error loading contacts:', error);
    });
  }

  getBackgroundColor(category: string): string {
    if (category === 'Sales') {
      return 'lightblue';
    } else if (category === 'Backoffice') {
      return 'darkblue';
    } else {
      // Generieren Sie eine zufällige Farbe, wenn die Kategorie weder 'Sales' noch 'Backoffice' ist
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    }
  }

  openTaskDialog(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      width: '600px',
      height: '850px',
      data: task
    });
  }

  /**
  createNewTask(): Task {
    return {
      header: '',
      title: '',
      content: '',
      date: '',
      person: '',
      priority: 'low',
      status: 'todo'
    };
  }
    **/

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container) {
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.element.nativeElement.getAttribute('data-status'); // Retrieve the custom attribute value

      if (newStatus) {
        this.taskService.updateTaskStatus(task.id, newStatus).subscribe(updatedTask => {
          console.log('Task updated:', updatedTask);
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }, error => {
          console.error('Error updating task:', error);
        });
      } else {
        console.error('Error: Container does not have a valid status attribute');
      }
    }
  }

  getInitials(name: string): string {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    } else {
      return words.map(word => word.charAt(0).toUpperCase()).join('');
    }
  }
}

interface Contact {
  name: string;
  color: string;
}
