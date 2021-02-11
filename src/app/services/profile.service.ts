import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
  ) { }
  Update(id, body) {
    return this.http.post(`http://3.137.146.195/api/v1/auth/${id}/`, body);
  }
}
