import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.taskService.updateTask(this.data).subscribe(
      (updatedTask) => {
        console.log('Task updated:', updatedTask);
        this.dialogRef.close(updatedTask);
        this.taskService.taskDeleted.emit();
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }
}

