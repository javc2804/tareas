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
  formattedDate: string = '';
  isEditing: boolean = false;
  @Output() taskUpdated = new EventEmitter();

  @Input() set taskToEdit(task: Task | undefined) {
    if (task) {
      this.task = task;
      this.isEditing = true;
      this.formattedDate = this.formatTaskDate(task.createdAt);
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

  formatTaskDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditing) {
        this.editTask(form);
      } else {
        this.addTask(form);
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  editTask(form: NgForm) {
    if (this.task.id !== undefined) {
      this.taskService.editTask(this.task.id, this.task).subscribe(
        (response) => {
          this.taskUpdated.emit();
          this.snackBar.open('Tarea actualizada correctamente', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          form.resetForm(this.getInitialTaskState());
          this.isEditing = false;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }

  addTask(form: NgForm) {
    delete this.task.id;
    this.taskService.addTask(this.task).subscribe(
      (response) => {
        this.taskUpdated.emit();
        this.snackBar.open('Tarea creada correctamente', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        form.resetForm(this.getInitialTaskState());
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
