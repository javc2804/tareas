import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login() {
    return { ok: true };
    // return this.http.post('/api/auth/login', credentials);
  }

  register() {
    return { ok: true };
    // return this.http.post('/api/auth/register', user);
  }
}
