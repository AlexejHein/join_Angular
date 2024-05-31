import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${task.id}/`, task);
  }

  updateTaskStatus(id: number, status: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}updatestatus/${id}/`, { status });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
