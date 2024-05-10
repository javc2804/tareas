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
  totalTasks = 100;
  tasksPerPage = 10;

  private taskCreatedSubscription: Subscription = Subscription.EMPTY;

  @Output() taskToEdit = new EventEmitter<Task>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.loadTasks(this.paginator.pageIndex, this.paginator.pageSize);
    });

    this.taskCreatedSubscription = this.taskService.taskCreated.subscribe(
      (newTask) => {
        this.totalTasks++;
        this.paginator.length = this.totalTasks;
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
          this.taskService.deleteTask(task.id as number).subscribe(() => {
            const index = this.tasks.indexOf(task);
            if (index > -1) {
              this.tasks.splice(index, 1);
            }
            this.totalTasks--;
            this.paginator.length = this.totalTasks;
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

    this.tasks = this.tasks.slice(startIndex, endIndex);
  }
}
