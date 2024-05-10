import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Programming } from '../model/programming';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProgrammingService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Programming[]> {
    return this.httpClient.get<Programming[]>(environment.apiUrl + "Programmings/GetList");
  }

  get(id: number): Observable<Programming> {
    return this.httpClient.get<Programming>(environment.apiUrl + "Programmings/GetById/" + id);
  }

  add(programmings: Programming): Observable<Programming> {
    return this.httpClient.post<Programming>(environment.apiUrl + "Programmings/Add", programmings);
  }

  update(programmings: Programming): Observable<Programming> {
    return this.httpClient.post<Programming>(environment.apiUrl + "Programmings/Update", programmings);
  }

  delete(programmings: Programming): Observable<Programming> {
    return this.httpClient.post<Programming>(environment.apiUrl + "Programmings/Delete", programmings);
  }
}
