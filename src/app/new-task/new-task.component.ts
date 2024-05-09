import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  task: Task = this.getInitialTaskState();

  formattedDate: string = formatDate(
    this.task.createdAt,
    'dd/MM/yyyy',
    'en-US'
  );
  isEditing: boolean = false;
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

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isEditing = false;
  }

  getInitialTaskState(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      createdAt: new Date(),
      status: false,
    };
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditing) {
        if (this.task.id !== undefined) {
          this.taskService.editTask(this.task.id, this.task).subscribe(
            (response) => {
              this.taskUpdated.emit();
              this.snackBar.open('Tarea actualizada correctamente', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
              form.resetForm(this.getInitialTaskState()); // Reset the form
              this.isEditing = false; // Reset the editing state
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error('Task ID is undefined');
        }
      } else {
        delete this.task.id;
        this.taskService.addTask(this.task).subscribe(
          (response) => {
            console.log(response);
            this.taskUpdated.emit();
            this.snackBar.open('Tarea creada correctamente', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            });
            form.resetForm(this.getInitialTaskState()); // Reset the form
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      console.error('Formulario inválido');
    }
  }
}
