import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  status: boolean;
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    createdAt: new Date(),
    status: false,
  };

  constructor(private taskService: TaskService) {}

  onSubmit() {
    this.taskService.addTask(this.task).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
