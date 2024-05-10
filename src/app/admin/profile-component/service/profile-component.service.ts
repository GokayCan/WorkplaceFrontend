import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileComponentService {

  constructor(

    private httpClient: HttpClient,) { }

  get() {

  }
}
