import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/login', { email, password });
  }
}
