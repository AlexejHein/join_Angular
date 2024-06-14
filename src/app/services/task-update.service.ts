import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {
  private taskUpdatedSource = new Subject<void>();

  taskUpdated$ = this.taskUpdatedSource.asObservable();

  taskUpdated() {
    this.taskUpdatedSource.next();
  }
}
