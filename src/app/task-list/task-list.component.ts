import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { Task } from '../models/task';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../components/ConfirmDialogComponent';

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
  totalTasks = 100; // Deberías obtener este valor del servidor
  tasksPerPage = 10; // Puedes cambiar esto a lo que quieras

  private taskCreatedSubscription: Subscription = Subscription.EMPTY;

  @Output() taskToEdit = new EventEmitter<Task>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    // Ensure paginator is defined
    setTimeout(() => {
      this.loadTasks(this.paginator.pageIndex, this.paginator.pageSize);
    });

    this.taskCreatedSubscription = this.taskService.taskCreated.subscribe(
      (newTask) => {
        // Increment the total number of tasks
        this.totalTasks++;
        // Update the paginator length
        this.paginator.length = this.totalTasks;
        // Reload the tasks for the current page
        this.loadTasks(this.paginator.pageIndex, this.paginator.pageSize);
      }
    );
  }

  ngOnDestroy() {
    this.taskCreatedSubscription.unsubscribe();
  }

  loadTasks(
    pageIndex: number = this.paginator.pageIndex,
    pageSize: number = this.paginator.pageSize
  ) {
    this.taskService.getTasks(pageIndex, pageSize).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskClick(task: Task) {}

  editTask(task: Task) {
    const taskCopy = Object.assign({}, task);
    this.taskToEdit.emit(taskCopy);
  }

  deleteTask(task: Task) {
    console.log(task);

    if (task.id !== undefined) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: '¿Estás seguro de que quieres eliminar esta tarea?',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // Use a type assertion to tell TypeScript that task._id is not undefined
          this.taskService.deleteTask(task.id as number).subscribe(() => {
            // Remove the task from the tasks array
            const index = this.tasks.indexOf(task);
            if (index > -1) {
              this.tasks.splice(index, 1);
            }
            // Decrement the total number of tasks
            this.totalTasks--;
            // Update the paginator length
            this.paginator.length = this.totalTasks;
            // Reload the tasks for the current page
            this.loadTasks(this.paginator.pageIndex, this.paginator.pageSize);
          });
        }
      });
    } else {
      console.error('Task ID is undefined');
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    // Aquí deberías obtener las tareas para la página actual del servidor
    // Por ahora, solo vamos a obtener las tareas de la lista de tareas existente
    this.tasks = this.tasks.slice(startIndex, endIndex);
  }
}
