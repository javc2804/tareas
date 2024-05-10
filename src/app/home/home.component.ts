import { Component, ViewChild } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../models/task';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;
  selectedTask: Task = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    status: false,
  };

  constructor(private authService: AuthService) {}

  loadTasks() {
    this.taskList.loadTasks();
  }

  logout() {
    this.authService.logout();
  }
}
