import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAddTask } from '../models/addTask';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class UserTaskService {
  private baseServiceURL: string = 'https://localhost:7039/UserTask/';

  constructor(private http: HttpClient, private router: Router) {}

  getUserTasks(userId: number) {
    return this.http.get<any>(`${this.baseServiceURL + userId}`);
  }

  updateUserTask(userTask: ITask) {
    return this.http.put<any>(`${this.baseServiceURL}`, userTask);
  }

  addUserTask(addTask: IAddTask) {
    return this.http.post<any>(`${this.baseServiceURL}`, addTask);
  }

  deleteUserTask(taskId: number) {
    return this.http.delete<any>(`${this.baseServiceURL + taskId}`);
  }
}
