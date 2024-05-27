import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { Task } from '../models/Task';


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
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      console.log('Tasks received from backend:', data);
      console.log('Tasks before categorizing:', this.tasks)
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
      task.status = event.container.id; // Assuming container id matches the task status
      this.taskService.updateTaskStatus(task).subscribe(updatedTask => {
        console.log('Task updated:', updatedTask);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }, error => {
        console.error('Error updating task:', error);
      });
    }
  }
}
