import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Observable } from 'rxjs';
import { CompanyList } from '../model/company-list';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(

    private httpClient: HttpClient,) { }

  getList(): Observable<CompanyList[]> {
    return this.httpClient.get<CompanyList[]>(environment.apiUrl + "Companies/GetList");
  }
  getListBySectorId(sectorId: number): Observable<CompanyList[]> {
    return this.httpClient.get<CompanyList[]>(environment.apiUrl + "Companies/GetListBySectorId/" + sectorId);
  }

  get(id: number): Observable<Company> {
    return this.httpClient.get<Company>(environment.apiUrl + "Companies/GetById/" + id);
  }

  add(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(environment.apiUrl + "Companies/Add", company);
  }

  update(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(environment.apiUrl + "Companies/Update", company);
  }

  delete(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(environment.apiUrl + "Companies/Delete", company);
  }
}
