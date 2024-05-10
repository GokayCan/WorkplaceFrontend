import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Sector } from '../model/sector';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Sector[]> {
    return this.httpClient.get<Sector[]>(environment.apiUrl + "Sectors/GetList");
  }

  get(id: number): Observable<Sector> {
    return this.httpClient.get<Sector>(environment.apiUrl + "Sectors/GetById/" + id);
  }

  add(sector: Sector): Observable<Sector> {
    return this.httpClient.post<Sector>(environment.apiUrl + "Sectors/Add", sector);
  }

  update(sector: Sector): Observable<Sector> {
    return this.httpClient.post<Sector>(environment.apiUrl + "Sectors/Update", sector);
  }

  delete(sector: Sector): Observable<Sector> {
    return this.httpClient.post<Sector>(environment.apiUrl + "Sectors/Delete", sector);
  }
}
