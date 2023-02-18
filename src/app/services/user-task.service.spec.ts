import { TestBed } from '@angular/core/testing';
import { UserTaskService } from './user-task.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserTaskService', () => {
  let service: UserTaskService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],
      providers: [UserTaskService], });
    service = TestBed.inject(UserTaskService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
