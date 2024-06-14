import {Component, OnDestroy, OnInit} from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { NewTaskDialogComponent} from "./new-task-dialog/new-task-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { ContactsService } from '../services/contacts.service';
import { Task } from '../models/Task';
import { Subscription } from "rxjs";
import { TaskUpdateService} from "../services/task-update.service";
import {  StatusService} from "../services/status.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  private taskDeletedSubscription: Subscription | undefined;
  contacts: Contact[] = [];
  subtasks: Subtask[] = [];


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

  searchTerm: string = '';
  filteredTasks: any = {};

  constructor(private dialog: MatDialog,
              private taskService: TaskService,
              private contactService: ContactsService,
              private taskUpdateService: TaskUpdateService,
              private statusService: StatusService,
              ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.getContacts();
    console.log('Contacts:', this.contacts);
    this.taskService.taskDeleted.subscribe(() => {
      this.loadTasks();
    });
    this.taskUpdateService.taskUpdated$.subscribe(() => {
        this.loadTasks();
      }
    );
    this.filteredTasks = this.tasks; // Initialisieren Sie filteredTasks beim Laden der Seite
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
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.filteredTasks = this.tasks; // Set filteredTasks to tasks after loading tasks from backend
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

  openTaskDialog(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      width: '600px',
      height: '850px',
      data: task
    });
  }

  openNewTaskDialog(status: 'todo' | 'done' | 'inProgress' | 'awaitingFeedback'): void {
    this.statusService.changeStatus(status);
    console.log('Status:', status); // Log the status
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '1000px',
      height: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask = {
          ...result,
          status: status
        };
        console.log('New task:', newTask); // Log the new task object
        this.taskService.addTask(newTask).subscribe(() => {
          console.log('Task created successfully');
          this.loadTasks(); // Refresh the tasks after a new task is created
          // Add the new task to the filteredTasks list
          if (!this.filteredTasks[status]) {
            this.filteredTasks[status] = [];
          }
          this.filteredTasks[status].push(newTask);
        }, (error: any) => {
          console.error('Error creating task:', error);
        });
      }
    });
  }

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
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
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

  getSubtaskProgress(task: Task): number {
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter((subtask: { completed: any; }) => subtask.completed).length;
    return (completedSubtasks / totalSubtasks) * 100;
  }

  getTotalSubtasks(task: Task): number {
    return task.subtasks ? task.subtasks.length : 0;
  }

  getCompletedSubtasks(task: Task): number {
    return task.subtasks ? task.subtasks.filter((subtask: { completed: any; }) => subtask.completed).length : 0;
  }

  searchTasks() {
    if (this.searchTerm.trim() === '') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = {
        todo: [],
        inProgress: [],
        awaitingFeedback: [],
        done: []
      };

      for (const status in this.tasks) {
        this.filteredTasks[status] = this.tasks[status as 'todo' | 'done' | 'inProgress' | 'awaitingFeedback'].filter((task: { title: string; description: string; }) =>
          task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  }
}


interface Subtask {
  title: string;
  completed: boolean;
}

interface Contact {
  name: string;
  color: string;
}
