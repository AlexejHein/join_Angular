import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  tasks = {
    todo: [
      { header: 'Hello', title: 'Task 1', content: 'Lorem ipsum dolor sit amet...', date: '1/4', person: 'AH' },
      { header: 'Hi', title: 'Task 2', content: 'Lorem ipsum dolor sit amet...', date: '2/4', person: 'BH' }
    ],
    inProgress: [
      { header: 'Test', title: 'Task 3', content: 'Lorem ipsum dolor sit amet...', date: '3/4', person: 'CH' }
    ],
    awaitingFeedback: [
      { header: 'Review', title: 'Task 4', content: 'Lorem ipsum dolor sit amet...', date: '4/4', person: 'DH' }
    ],
    done: [
      { header: 'Completed', title: 'Task 5', content: 'Lorem ipsum dolor sit amet...', date: '5/4', person: 'EH' }
    ]
  };

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.tasks)
  }
}
