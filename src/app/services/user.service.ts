import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {}

  signup(signupUser: any) {    
    return this.http.post<any>(`${environment.apiUrl}/User/signup`, signupUser);
  }

  login(loginUser: any) {    
    return this.http.post<any>(
      `${environment.apiUrl}/User/authenticate`,
      loginUser
    );
  }

  getUsers() {    
    return this.http.get<any>(`${environment.apiUrl}/User`);
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
