import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interest } from '../model/interest';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Interest[]> {
    return this.httpClient.get<Interest[]>(environment.apiUrl + "Interests/GetList");
  }

  get(id: number): Observable<Interest> {
    return this.httpClient.get<Interest>(environment.apiUrl + "Interests/GetById/" + id);
  }

  add(interest: Interest): Observable<Interest> {
    return this.httpClient.post<Interest>(environment.apiUrl + "Interests/Add", interest);
  }

  update(interest: Interest): Observable<Interest> {
    return this.httpClient.post<Interest>(environment.apiUrl + "Interests/Update", interest);
  }

  delete(interest: Interest): Observable<Interest> {
    return this.httpClient.post<Interest>(environment.apiUrl + "Interests/Delete", interest);
  }
}
