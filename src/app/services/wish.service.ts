import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }
  ServicesList(Token) {
    return this.http.get(`/api/v1/service/`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Token,
          // 'Access-Control-Allow-Headers': "*"
        })
      });
  }
  AuthServicesList(Token) {
    return this.http.get(`/api/v1/auth/services_wish_list/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  // /api/v1/auth/services_wish_list/
  ContactCompany(id, Token) {
    return this.http.get(`/api/v1/service/${id}/contact_company/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  UnWish(id, Token) {
    return this.http.get(`/api/v1/service/${id}/wish_list/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  UpdateDate(Link, Token) {
    return this.http.get(`${Link}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  CompanysList(Token) {
    return this.http.get(`/api/v1/company/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }

  FiltterCompanyServices(id, Token) {
    return this.http.get(`/api/v1/company/${id}/services/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
}
