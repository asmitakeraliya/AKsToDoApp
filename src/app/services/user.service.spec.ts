import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  let allUsers: any[];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Test Get All Users', () => {
    //Added this log to check whether it reaches here - TBD - To be removed later
    console.log('Inside Test Get All Users ');

    // Added log to geyUsers method of User Service, Its getting executed, but its not inside subscribe
    //TBD - to be fixed
    service.getUsers().subscribe((res) => {
      console.log('get user response - ' + res);

      //This will be called when user retrieved successfully. Checking length to make sure it retruns atleast 1 record.
      expect(res.length).toBeGreaterThanOrEqual(1);
    });
  });
});
