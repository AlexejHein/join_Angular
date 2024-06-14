import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewTaskDialogComponent>) {}
}
