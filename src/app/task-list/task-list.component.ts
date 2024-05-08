import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { Task } from '../models/task';

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

  @Output() taskToEdit = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();

    this.taskCreatedSubscription = this.taskService.taskCreated.subscribe(
      (newTask) => {
        this.tasks.push(newTask);
      }
    );
  }

  ngOnDestroy() {
    this.taskCreatedSubscription.unsubscribe();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskClick(task: Task) {}

  editTask(task: Task) {
    const taskCopy = Object.assign({}, task);
    this.taskToEdit.emit(taskCopy);
  }
  deleteTask(task: Task) {}
}
