import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentLesson } from '../model/student-lesson';
import { StudentLessonList } from '../model/student-lesson-list';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentLessonService {

  constructor(private httpClient: HttpClient) { }

  getlist(): Observable<StudentLesson> {
    return this.httpClient.get<StudentLesson>(environment.apiUrl + "StudentLesson/GetList");
  }

  getlistDto(): Observable<StudentLessonList> {
    return this.httpClient.get<StudentLessonList>(environment.apiUrl + "StudentLesson/GetListDto");
  }

  getlistByStudentId(studentId: number): Observable<StudentLesson> {
    return this.httpClient.get<StudentLesson>(environment.apiUrl + "StudentLesson/GetListByStudentId/" + studentId);
  }

  get(id: number): Observable<StudentLesson> {
    return this.httpClient.get<StudentLesson>(environment.apiUrl + "StudentLesson/GetById/" + id);
  }

  add(studentLesson: StudentLesson): Observable<StudentLesson> {
    return this.httpClient.post<StudentLesson>(environment.apiUrl + "StudentLesson/Add", studentLesson);
  }

  update(studentLesson: StudentLesson): Observable<StudentLesson> {
    return this.httpClient.post<StudentLesson>(environment.apiUrl + "StudentLesson/Update", studentLesson);
  }

  delete(studentLesson: StudentLessonList): Observable<StudentLessonList> {
    return this.httpClient.post<StudentLessonList>(environment.apiUrl + "StudentLesson/Delete", studentLesson);
  }
}
