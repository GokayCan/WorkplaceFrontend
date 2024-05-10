import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CompanyStaff } from '../model/companyStaff';
import { Observable } from 'rxjs';
import { CompanyStaffList } from '../model/companyStaffList';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyStaffService {

  constructor(

    private httpClient: HttpClient,) { }

  getList(): Observable<CompanyStaff[]> {
    return this.httpClient.get<CompanyStaff[]>(environment.apiUrl + "CompanyStaffs/GetList");
  }

  getListByCompanyId(companyId: number): Observable<CompanyStaffList[]> {
    return this.httpClient.get<CompanyStaffList[]>(environment.apiUrl + "CompanyStaffs/GetListDtoByCompanyId/" + companyId);
  }

  get(id: number): Observable<CompanyStaff> {
    return this.httpClient.get<CompanyStaff>(environment.apiUrl + "CompanyStaffs/GetById/" + id);
  }

  add(company: CompanyStaff): Observable<CompanyStaff> {
    return this.httpClient.post<CompanyStaff>(environment.apiUrl + "CompanyStaffs/Add", company);
  }

  update(company: CompanyStaff): Observable<CompanyStaff> {
    return this.httpClient.post<CompanyStaff>(environment.apiUrl + "CompanyStaffs/Update", company);
  }

  delete(company: CompanyStaff): Observable<CompanyStaff> {
    return this.httpClient.post<CompanyStaff>(environment.apiUrl + "CompanyStaffs/Delete", company);
  }

}
