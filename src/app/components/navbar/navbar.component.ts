import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  fullname: string = '';
  role: string = '';
  isLoggedIn: boolean = false;
  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.fullname = this.authService.getValue('fullname') as string;
      this.role = this.authService.getValue('role') as string;
    }
  }

  logout() {
    this.authService.signOut();
  }
}
