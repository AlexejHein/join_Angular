import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSource = new BehaviorSubject<'todo' | 'done' | 'inProgress' | 'awaitingFeedback'>('todo');
  currentStatus = this.statusSource.asObservable();

  constructor() { }

  changeStatus(status: 'todo' | 'done' | 'inProgress' | 'awaitingFeedback') {
    this.statusSource.next(status);
  }
}
