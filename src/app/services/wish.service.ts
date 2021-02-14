import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishService {
name:string;
price:number;
after:number;
descrioption:string
constructor(private http: HttpClient) { }

setitem(name,price,after,descrioption){
  this.name=name;
  this.price=price;
  this.after=after;
  this.descrioption=descrioption;
}
getitem(){
   return {
     name:this.name,
     price:this.price,
     after:this.after,
     description:this.descrioption
    }
}




  ServicesList(Token) {
    console.log('this is token',Token.replace(/['"]+/g, ''));
    console.log( `Bearer ${Token}`);

    return this.http.get(`http://3.137.146.195/api/v1/service/`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
          // 'Access-Control-Allow-Headers': "*"
        })
      });
  }
  AuthServicesList(Token) {
    return this.http.get(`http://3.137.146.195/api/v1/auth/services_wish_list/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  // /api/v1/auth/services_wish_list/
  ContactCompany(id, Token) {
    return this.http.get(`http://3.137.146.195/api/v1/service/${id}/contact_company/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  UnWish(id, Token) {
    return this.http.get(`http://3.137.146.195/api/v1/service/${id}/wish_list/`, {
      headers: new HttpHeaders({
        
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
  UpdateDate(Link, Token) {
    console.log(Link,Token);
    return this.http.get(`${Link}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`

        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }

  CompanysList(Token) {
    console.log(Token);
    console.log(`Bearer ${Token}`);
    
    return this.http.get(`http://3.137.146.195/api/v1/company/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }

  FiltterCompanyServices(id, Token) {
    return this.http.get(`http://3.137.146.195/api/v1/company/${id}/services/`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token.replace(/['"]+/g, '')}`
        // 'Access-Control-Allow-Headers': "*"
      })
    });
  }
}
