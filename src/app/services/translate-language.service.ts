import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddTranslateHistory } from '../models/AddTranslateHistory';
import { ITranslateLanguage } from '../models/translateLanguage';

@Injectable({
  providedIn: 'root',
})
export class TranslateLanguageService {
  private googleAPIURL: string =
    'https://translation.googleapis.com/language/translate/v2/?key=';
  private APIKey: string = 'AIzaSyC2MLqIChbMU4ChQvXSGq_Aq6js-lsn4kc';
  private baseServiceURL: string = 'https://localhost:7039/TranslateHistory/';

  constructor(private http: HttpClient) {}

  translate(translate: ITranslateLanguage) {
    return this.http.post<any>(
      `${this.googleAPIURL} + ${this.APIKey}`,
      translate
    );
  }

  addTranslateHistory(addTranslateHistory: IAddTranslateHistory) {
    console.log('translate history - ' + addTranslateHistory);
    return this.http.post<any>(`${this.baseServiceURL}`, addTranslateHistory);
  }

  getTranslateHistory(userId: number) {
    return this.http.get<any>(`${this.baseServiceURL + userId}`);
  }
}
