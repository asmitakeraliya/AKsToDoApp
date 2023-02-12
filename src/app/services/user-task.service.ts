import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAddTask } from '../models/addTask';
import { ITask } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class UserTaskService {

  constructor(private http: HttpClient, private router: Router) {}

  getUserTasks(userId: number) {    
    return this.http.get<any>(`${environment.apiUrl}/UserTask/${userId}`);
  }

  updateUserTask(userTask: ITask) {
    return this.http.put<any>(`${environment.apiUrl}/UserTask/`, userTask);
  }

  addUserTask(addTask: IAddTask) {
    return this.http.post<any>(`${environment.apiUrl}/UserTask/`, addTask);
  }

  deleteUserTask(taskId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/UserTask/${taskId}`);
  }
}
