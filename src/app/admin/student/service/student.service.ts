import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { StudentList } from '../model/student-list';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<StudentList[]> {
    return this.httpClient.get<StudentList[]>(environment.apiUrl + "Students/GetList");
  }

  getListByDepartmentId(id: number): Observable<StudentList[]> {
    return this.httpClient.get<StudentList[]>(environment.apiUrl + "Students/GetListByDepartmentId/" + id);
  }

  get(id: number): Observable<Student> {
    return this.httpClient.get<Student>(environment.apiUrl + "Students/GetById/" + id);
  }

  add(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(environment.apiUrl + "Students/Add", student);
  }

  update(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(environment.apiUrl + "Students/Update", student);
  }

  delete(student: StudentList): Observable<StudentList> {
    return this.httpClient.post<StudentList>(environment.apiUrl + "Students/Delete", student);
  }
}
