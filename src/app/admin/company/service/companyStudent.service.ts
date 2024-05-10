import { Inject, Injectable } from '@angular/core';
import { CompanyStudent } from '../model/companyStudent';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyStudentList } from '../model/companyStudentList';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyStudentService {

  constructor(

    private httpClient: HttpClient,) { }

  getList(): Observable<CompanyStudent[]> {
    return this.httpClient.get<CompanyStudent[]>(environment.apiUrl + "CompanyStudents/GetList");
  }

  getListByCompanyId(companyId: number): Observable<CompanyStudentList[]> {
    return this.httpClient.get<CompanyStudentList[]>(environment.apiUrl + "CompanyStudents/GetListDtoByCompanyId/" + companyId);
  }

  get(id: number): Observable<CompanyStudent> {
    return this.httpClient.get<CompanyStudent>(environment.apiUrl + "CompanyStudents/GetById/" + id);
  }

  add(company: CompanyStudent): Observable<CompanyStudent> {
    return this.httpClient.post<CompanyStudent>(environment.apiUrl + "CompanyStudents/Add", company);
  }

  update(company: CompanyStudent): Observable<CompanyStudent> {
    return this.httpClient.post<CompanyStudent>(environment.apiUrl + "CompanyStudents/Update", company);
  }

  delete(company: CompanyStudentList): Observable<CompanyStudentList> {
    return this.httpClient.post<CompanyStudentList>(environment.apiUrl + "CompanyStudents/Delete", company);
  }

}
