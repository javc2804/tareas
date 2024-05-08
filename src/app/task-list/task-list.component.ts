import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
interface Task {
  createdAt: Date;
  title: string;
  description: string;
  status: boolean; // Cambia el tipo de 'status' a 'boolean'
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = [
    'creationDate',
    'title',
    'description',
    'status',
    'action',
  ];
  tasks: Task[] = [];
  private taskCreatedSubscription: Subscription = Subscription.EMPTY;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.taskCreatedSubscription = this.taskService.taskCreated.subscribe(
      (newTask) => {
        this.tasks.push(newTask);
      }
    );
  }

  ngOnDestroy() {
    this.taskCreatedSubscription.unsubscribe();
  }

  onTaskClick(task: Task) {
    // handle task click
  }

  editTask(task: Task) {}
  deleteTask(task: Task) {}
}
