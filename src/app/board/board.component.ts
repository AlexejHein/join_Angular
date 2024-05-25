import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
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

  constructor(private dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    console.log('Tasks:', this.tasks);
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

  openTaskDialog(task: Task): void {
    this.dialog.open(TaskDialogComponent, {
      width: '600px',
      height: '850px',
      data: task
    });
  }

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

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

// task.model.ts
export interface Task {
  header: string;
  title: string;
  content: string;
  date: string;
  person: string;
  priority: string;
  status: string;
}
