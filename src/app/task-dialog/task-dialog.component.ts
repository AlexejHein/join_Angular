import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { Task } from '../models/Task';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '600px',
      height: '800px',
      data: { ...this.data }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dialogRef.close(result); // Schließen Sie den aktuellen Dialog und geben Sie das aktualisierte Task zurück
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.dialogRef.close();
      this.taskService.taskDeleted.emit();
    });
  }

  getInitialsAndName(name: string) {
    if (!name) return '';

    let parts = name.split(' ');
    let initials = '';

    if (parts.length > 0) {
      initials += parts[0] ? parts[0].charAt(0) : '';
    }

    if (parts.length > 1) {
      initials += parts[parts.length - 1] ? parts[parts.length - 1].charAt(0) : '';
    }

    return `${initials}`;
  }

  toggleSubtask(subtask: Subtask) {
    subtask.completed = !subtask.completed;
    this.updateProgressBar();
  }

  updateProgressBar() {
    const totalSubtasks = this.data.subtasks.length;
    const completedSubtasks = this.data.subtasks.filter((subtask: { completed: any; }) => subtask.completed).length;
    this.data.progress = (completedSubtasks / totalSubtasks) * 100;
    this.taskService.updateTask(this.data).subscribe(
      (updatedTask) => {
        console.log('Task updated:', updatedTask);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}

interface Subtask {
  title: string;
  completed: boolean;
}

