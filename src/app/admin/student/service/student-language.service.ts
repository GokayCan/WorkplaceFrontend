import { Inject, Injectable } from '@angular/core';
import { StudentLanguageList } from '../model/student-language-list';
import { StudentLanguage } from '../model/student-language';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentLanguageService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<StudentLanguageList[]> {
    return this.httpClient.get<StudentLanguageList[]>(environment.apiUrl + "StudentLanguages/GetList");
  }

  get(id: number): Observable<StudentLanguage> {
    return this.httpClient.get<StudentLanguage>(environment.apiUrl + "StudentLanguages/GetById/" + id);
  }

  getListDto(): Observable<StudentLanguageList[]> {
    return this.httpClient.get<StudentLanguageList[]>(environment.apiUrl + "StudentLanguages/GetListDto");
  }

  getListDtoByLanguageId(id: number): Observable<StudentLanguageList[]> {
    return this.httpClient.get<StudentLanguageList[]>(environment.apiUrl + "StudentLanguages/GetListDtoByLanguageId/" + id);
  }

  getListDtoByStudentId(id: number): Observable<StudentLanguageList[]> {
    return this.httpClient.get<StudentLanguageList[]>(environment.apiUrl + "StudentLanguages/GetListDtoByStudentId/" + id);
  }

  add(studentLanguage: StudentLanguage): Observable<StudentLanguage> {
    return this.httpClient.post<StudentLanguage>(environment.apiUrl + "StudentLanguages/Add", studentLanguage);
  }

  update(studentLanguage: StudentLanguage): Observable<StudentLanguage> {
    return this.httpClient.post<StudentLanguage>(environment.apiUrl + "StudentLanguages/Update", studentLanguage);
  }

  delete(studentLanguage: StudentLanguageList): Observable<StudentLanguageList> {
    return this.httpClient.post<StudentLanguageList>(environment.apiUrl + "StudentLanguages/Delete", studentLanguage);
  }
}
