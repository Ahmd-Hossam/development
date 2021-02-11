import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient,
  ) { }
  SendMessage(body) {
    return this.http.post(`/api/v1/contact/`, body);
  }
}
