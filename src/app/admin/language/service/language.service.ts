import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../model/language';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(environment.apiUrl + "Languages/GetList");
  }

  get(id: number): Observable<Language> {
    return this.httpClient.get<Language>(environment.apiUrl + "Languages/GetById/" + id);
  }

  add(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(environment.apiUrl + "Languages/Add", language);
  }

  update(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(environment.apiUrl + "Languages/Update", language);
  }

  delete(language: Language): Observable<Language> {
    return this.httpClient.post<Language>(environment.apiUrl + "Languages/Delete", language);
  }
}
