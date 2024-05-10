import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { LessonList } from '../model/lesson-list';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Lesson> {
    return this.httpClient.get<Lesson>(environment.apiUrl + "Lesson/GetList");
  }

  getListDto(): Observable<LessonList> {
    return this.httpClient.get<LessonList>(environment.apiUrl + "Lesson/GetListDto");
  }

  getListByDepartmentId(departmentId: number): Observable<LessonList> {
    return this.httpClient.get<LessonList>(environment.apiUrl + "Lesson/GetListByDepartmentId/" + departmentId);
  }
  get(id: number): Observable<Lesson> {
    return this.httpClient.get<Lesson>(environment.apiUrl + "Lesson/GetById/" + id);
  }

  add(lesson: Lesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(environment.apiUrl + "Lesson/Add", lesson);
  }

  update(lesson: Lesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(environment.apiUrl + "Lesson/Update", lesson);
  }

  delete(lesson: Lesson): Observable<Lesson> {
    return this.httpClient.post<Lesson>(environment.apiUrl + "Lesson/Delete", lesson);
  }
}
