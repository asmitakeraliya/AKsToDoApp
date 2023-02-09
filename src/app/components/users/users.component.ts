import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateLanguageService } from 'src/app/services/translate-language.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  allUsers: IUser[] = [];
  userTranslateHistory: any[] = [];
  isRowExpanded: boolean = false;
  columnsToDisplay: string[] = [
    'id',
    'firstName',
    'lastName',
    'role',
    'email',
    'isDisabled',
  ];
  dataSource = new MatTableDataSource<IUser>(this.allUsers);
  dsTranslateHistory = new MatTableDataSource<any>(this.userTranslateHistory);

  @ViewChild(MatPaginator, { static: true }) paginator: any = MatPaginator;
  expandedElement: IUser | null | undefined;
  columnsToDisplayWithExpand: string[] = [
    'userId',
    'fromLanguage',
    'fromText',
    'toLanguage',
    'toText',
    'translateDate',
    'translateTime',
  ];

  constructor(
    private userService: UserService,
    private translateLanguageService: TranslateLanguageService
  ) {}
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.getUsers().subscribe({
      next: (res) => {
        //Users Retrieved Successfully

        this.allUsers = res;
        this.allUsers = this.allUsers.map((item) => ({
          ...item,
          isExpanded: false,
        }));
        this.dataSource.data = this.allUsers;

        console.log('modified response - ' + JSON.stringify(this.allUsers));
        console.log('datasource - ' + JSON.stringify(this.dataSource.data));
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });
  }

  getTranslateHistory(user: IUser) {
    this.translateLanguageService.getTranslateHistory(user.id).subscribe({
      next: (res) => {
        //Users Translate History Retrieved Successfully

        this.userTranslateHistory = res;
        this.dsTranslateHistory.data = this.userTranslateHistory;
      },
      error: (err) => {
        alert(err?.error.message);
      },
    });

    user.isExpanded = !user.isExpanded;
  }
}
