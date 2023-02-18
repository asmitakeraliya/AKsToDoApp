import { TestBed } from '@angular/core/testing';
import { TranslateLanguageService } from './translate-language.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TranslateLanguageService', () => {
  let service: TranslateLanguageService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslateLanguageService],
    });
    service = TestBed.inject(TranslateLanguageService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
