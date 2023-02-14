import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authService: UserService, private route: Router) {}

  ngOnInit(): void {
    // subscribing to route event to refresh navigation bar.
    // Tried to check on only NavigationEnd, but application depoyed on cloud gave different names
    // Events on local  - NavigationStart, RoutesRecognized, GuardsCheckStart, GuardsCheckEnd, ResolveStart, ResolveEnd, NavigationEnd
    // Events on cloud deployed app - Lp, GV, WV, QV, eB, qV, YV, KV, tB, JV, Mr, SC
    // This code can be optimised
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        this.isLoggedIn = this.authService.isLoggedIn();
        if (this.isLoggedIn) {
          this.fullname = this.authService.getValue('fullname') as string;
          this.role = this.authService.getValue('role') as string;
        }
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
}
