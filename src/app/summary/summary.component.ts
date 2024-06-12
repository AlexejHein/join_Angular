import { Component } from '@angular/core';
import { TaskService} from "../services/task.service";
import { Task} from "../models/Task";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {

  tasks: Task[] = [];
  urgentTask: Task | null = null;
  taskCounts = {
    todo: 0,
    inProgress: 0,
    awaitingFeedback: 0,
    done: 0,
    total: 0,
    urgent: 0
  };

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      console.log('Tasks received from backend:', data);
      this.tasks = data;

      this.taskCounts.todo = this.tasks.filter(task => task.status === 'todo').length;
      this.taskCounts.inProgress = this.tasks.filter(task => task.status === 'inProgress').length;
      this.taskCounts.awaitingFeedback = this.tasks.filter(task => task.status === 'awaitingFeedback').length;
      this.taskCounts.done = this.tasks.filter(task => task.status === 'done').length;
      this.taskCounts.total = this.tasks.length;
      this.taskCounts.urgent = this.tasks.filter(task => task.priority === 'urgent').length;
      this.urgentTask = data.find(task => task.priority === 'urgent') || data.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0];});
  }

}
