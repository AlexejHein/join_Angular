import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';


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
}

