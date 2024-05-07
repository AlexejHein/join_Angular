import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  tasks = {
    todo: [
      { header: 'Hello', title: 'Task 1', content: 'Lorem ipsum dolor sit amet...', date: '1/4', person: 'AH', data: '29/07/2024', priority: 'low'},
      { header: 'Hi', title: 'Task 2', content: 'Lorem ipsum dolor sit amet...', date: '2/4', person: 'BH', data: '29/07/2024', priority: 'low' }
    ],
    inProgress: [
      { header: 'Test', title: 'Task 3', content: 'Lorem ipsum dolor sit amet...', date: '3/4', person: 'CH', data: '29/07/2024', priority: 'middle' }
    ],
    awaitingFeedback: [
      { header: 'Review', title: 'Task 4', content: 'Lorem ipsum dolor sit amet...', date: '4/4', person: 'DH', data: '13/04/2024', priority: 'urgent' }
    ],
    done: [
      { header: 'Completed', title: 'Task 5', content: 'Lorem ipsum dolor sit amet...', date: '5/4', person: 'EH', data: '29/07/2024', priority: 'low' }
    ]
  };

  constructor(private dialog: MatDialog) {}

  openTaskDialog(task: any): void {
    this.dialog.open(TaskDialogComponent, {
      width: '600px',
      height: '850px',
      data: task
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
