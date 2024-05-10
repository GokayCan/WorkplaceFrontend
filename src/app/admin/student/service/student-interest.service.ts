import { Inject, Injectable } from '@angular/core';
import { StudentInterest } from '../model/student-interest';
import { StudentInterestList } from '../model/student-interest-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentInterestService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<StudentInterestList[]> {
    return this.httpClient.get<StudentInterestList[]>(environment.apiUrl + "StudentInterests/GetList");
  }

  get(id: number): Observable<StudentInterest> {
    return this.httpClient.get<StudentInterest>(environment.apiUrl + "StudentInterests/GetById/" + id);
  }

  getListDto(): Observable<StudentInterestList[]> {
    return this.httpClient.get<StudentInterestList[]>(environment.apiUrl + "StudentInterests/GetListDto");
  }

  getListDtoByInterestId(id: number): Observable<StudentInterestList[]> {
    return this.httpClient.get<StudentInterestList[]>(environment.apiUrl + "StudentInterests/GetListDtoByInterestId/" + id);
  }

  getListDtoByStudentId(id: number): Observable<StudentInterestList[]> {
    return this.httpClient.get<StudentInterestList[]>(environment.apiUrl + "StudentInterests/GetListDtoByStudentId/" + id);
  }

  add(studentInterest: StudentInterest): Observable<StudentInterest> {
    return this.httpClient.post<StudentInterest>(environment.apiUrl + "StudentInterests/Add", studentInterest);
  }

  update(studentInterest: StudentInterest): Observable<StudentInterest> {
    return this.httpClient.post<StudentInterest>(environment.apiUrl + "StudentInterests/Update", studentInterest);
  }

  delete(studentInterest: StudentInterestList): Observable<StudentInterestList> {
    return this.httpClient.post<StudentInterestList>(environment.apiUrl + "StudentInterests/Delete", studentInterest);
  }
}
