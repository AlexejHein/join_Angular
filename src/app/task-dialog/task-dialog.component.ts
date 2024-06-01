import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../models/Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  // In Ihrer TaskDialogComponent Datei
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.dialogRef.close();
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
}

