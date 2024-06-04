import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryResetService {
  private resetCategorySource = new BehaviorSubject<boolean>(false);
  resetCategory$ = this.resetCategorySource.asObservable();

  resetCategory() {
    this.resetCategorySource.next(true);
  }
}
