import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../model/department';
import { DepartmentList } from '../model/department-list';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<DepartmentList[]> {
    return this.httpClient.get<DepartmentList[]>(environment.apiUrl + "Departments/GetList");
  }

  get(id: number): Observable<Department> {
    return this.httpClient.get<Department>(environment.apiUrl + "Departments/GetById/" + id);
  }

  add(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(environment.apiUrl + "Departments/Add", department);
  }

  update(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(environment.apiUrl + "Departments/Update", department);
  }

  delete(department: DepartmentList): Observable<DepartmentList> {
    return this.httpClient.post<DepartmentList>(environment.apiUrl + "Departments/Delete", department);
  }
}
