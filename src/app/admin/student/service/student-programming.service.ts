import { Inject, Injectable } from '@angular/core';
import { StudentProgrammingList } from '../model/student-programming-list';
import { StudentProgramming } from '../model/student-programming';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentProgrammingService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<StudentProgrammingList[]> {
    return this.httpClient.get<StudentProgrammingList[]>(environment.apiUrl + "StudentProgrammings/GetList");
  }

  get(id: number): Observable<StudentProgramming> {
    return this.httpClient.get<StudentProgramming>(environment.apiUrl + "StudentProgrammings/GetById/" + id);
  }

  getListDto(): Observable<StudentProgrammingList[]> {
    return this.httpClient.get<StudentProgrammingList[]>(environment.apiUrl + "StudentProgrammings/GetListDto");
  }

  getListDtoByProgrammingId(id: number): Observable<StudentProgrammingList[]> {
    return this.httpClient.get<StudentProgrammingList[]>(environment.apiUrl + "StudentProgrammings/GetListDtoByProgrammingId/" + id);
  }

  getListDtoByStudentId(id: number): Observable<StudentProgrammingList[]> {
    return this.httpClient.get<StudentProgrammingList[]>(environment.apiUrl + "StudentProgrammings/GetListDtoByStudentId/" + id);
  }

  add(studentProgramming: StudentProgramming): Observable<StudentProgramming> {
    return this.httpClient.post<StudentProgramming>(environment.apiUrl + "StudentProgrammings/Add", studentProgramming);
  }

  update(studentProgramming: StudentProgramming): Observable<StudentProgramming> {
    return this.httpClient.post<StudentProgramming>(environment.apiUrl + "StudentProgrammings/Update", studentProgramming);
  }

  delete(studentProgramming: StudentProgrammingList): Observable<StudentProgrammingList> {
    return this.httpClient.post<StudentProgrammingList>(environment.apiUrl + "StudentProgrammings/Delete", studentProgramming);
  }
}
