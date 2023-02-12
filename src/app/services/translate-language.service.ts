import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAddTranslateHistory } from '../models/AddTranslateHistory';
import { ITranslateLanguage } from '../models/translateLanguage';

@Injectable({
  providedIn: 'root',
})
export class TranslateLanguageService {

  constructor(private http: HttpClient) {}

  translate(translate: ITranslateLanguage) {    

    return this.http.post<any>(
      `${environment.googleApiUrl}/?key=${environment.googleApiKey}`,
      translate
    );
  }

  addTranslateHistory(addTranslateHistory: IAddTranslateHistory) {    
    return this.http.post<any>(`${environment.apiUrl}/TranslateHistory/`, addTranslateHistory);
  }

  getTranslateHistory(userId: number) {
    return this.http.get<any>(`${environment.apiUrl}/TranslateHistory/${userId}`);
  }
}
