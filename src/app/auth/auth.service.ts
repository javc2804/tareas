import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { catchError, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

interface Credentials {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http
      .get(`${environment.apiUrl}/auth/users/${credentials.username}`)
      .pipe(
        catchError((error) => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  register(credentials: Credentials) {
    return this.http.post(`${environment.apiUrl}/auth/user/`, credentials).pipe(
      catchError((error) => {
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}
