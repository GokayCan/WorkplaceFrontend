import { Inject, Injectable } from '@angular/core';
import { CompanyResponsible } from '../model/companyResponsible';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyResponsibleList } from '../model/companyResponsibleList';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyResponsibleService {

  constructor(

    private httpClient: HttpClient,) { }

  getList(): Observable<CompanyResponsible[]> {
    return this.httpClient.get<CompanyResponsible[]>(environment.apiUrl + "CompanyResponsibles/GetList");
  }

  getListByCompanyId(companyId: number): Observable<CompanyResponsibleList[]> {
    return this.httpClient.get<CompanyResponsibleList[]>(environment.apiUrl + "CompanyResponsibles/GetListDtoByCompanyId/" + companyId);
  }

  get(id: number): Observable<CompanyResponsible> {
    return this.httpClient.get<CompanyResponsible>(environment.apiUrl + "CompanyResponsibles/GetById/" + id);
  }

  add(company: CompanyResponsible): Observable<CompanyResponsible> {
    return this.httpClient.post<CompanyResponsible>(environment.apiUrl + "CompanyResponsibles/Add", company);
  }

  update(company: CompanyResponsible): Observable<CompanyResponsible> {
    return this.httpClient.post<CompanyResponsible>(environment.apiUrl + "CompanyResponsibles/Update", company);
  }

  delete(company: CompanyResponsible): Observable<CompanyResponsible> {
    return this.httpClient.post<CompanyResponsible>(environment.apiUrl + "CompanyResponsibles/Delete", company);
  }

}
