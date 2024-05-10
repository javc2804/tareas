import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskCreated = new Subject<Task>();
  private apiUrl = `${environment.apiUrl}/tasks`;
  constructor(private http: HttpClient) {}

  getTasks(pageIndex: number, pageSize: number): Observable<Task[]> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Task[]>(this.apiUrl, { params });
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, task)
      .pipe(tap((newTask) => this.taskCreated.next(newTask)));
  }

  editTask(id: number, updatedTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, updatedTask);
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);

    return this.http.delete<Task>(url);
  }
}
