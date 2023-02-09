import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseServiceURL: string = 'https://localhost:7039/User/';
  constructor(private http: HttpClient, private router: Router) {}

  signup(signupUser: any) {
    return this.http.post<any>(`${this.baseServiceURL}signup`, signupUser);
  }

  login(loginUser: any) {
    return this.http.post<any>(`${this.baseServiceURL}authenticate`, loginUser);
  }

  getUsers() {
    return this.http.get<any>(`${this.baseServiceURL}`);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeKeyValue(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getValue(key: string) {
    return localStorage.getItem(key);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }
}
