import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient,

  ) { }
  SendMessage(Message, id,Token ) {
    return this.http.post(`/api/v1/service/${id}/contact_company/`, Message, 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Token,
        // 'Access-Control-Allow-Headers': "*"
      })
    }
    );
  }
}
