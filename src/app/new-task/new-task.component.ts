import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  task: Task = {
    _id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    status: false,
  };

  formattedDate: string = formatDate(
    this.task.createdAt,
    'dd/MM/yyyy',
    'en-US'
  );
  isEditing: boolean = false;
  @Output() taskAdded = new EventEmitter();
  @Output() taskUpdated = new EventEmitter();
  @Input() set editTask(task: Task | undefined) {
    if (task) {
      let date;

      if (typeof task.createdAt === 'string' && task.createdAt !== '') {
        date = new Date(task.createdAt);
      } else if (task.createdAt) {
        date = task.createdAt;
      }

      if (date) {
        this.formattedDate = formatDate(date, 'dd/MM/yyyy', 'en-US');
      }

      this.task = task;
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }
  }

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isEditing = false;
  }

  onSubmit() {
    if (this.isEditing) {
      if (this.task._id !== undefined) {
        this.taskService.editTask(this.task._id, this.task).subscribe(
          (response) => {
            console.log(response);
            this.taskUpdated.emit();
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error('Task ID is undefined');
      }
    } else {
      delete this.task._id;
      this.taskService.addTask(this.task).subscribe(
        (response) => {
          console.log(response);
          this.taskAdded.emit();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
