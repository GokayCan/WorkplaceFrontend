import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../model/staff';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(environment.apiUrl + "Staffs/GetList");
  }

  get(id: number): Observable<Staff> {
    return this.httpClient.get<Staff>(environment.apiUrl + "Staffs/GetById/" + id);
  }

  getByUserId(id: number): Observable<Staff> {
    return this.httpClient.get<Staff>(environment.apiUrl + "Staffs/GetByUserId/" + id);
  }

  add(student: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(environment.apiUrl + "Staffs/Add", student);
  }

  update(student: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(environment.apiUrl + "Staffs/Update", student);
  }

  delete(student: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(environment.apiUrl + "Staffs/Delete", student);
  }
}
