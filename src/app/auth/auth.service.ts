import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router'; // Importa Router

interface Credentials {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    // Inyecta Router
    // Al iniciar, establece el estado de autenticación basado en el almacenamiento local
    this.setAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }

  login(credentials: Credentials) {
    return this.http
      .get(`${environment.apiUrl}/auth/users/${credentials.username}`)
      .pipe(
        tap((response) => {
          if (response) {
            this.setAuthenticated(true);
          }
        }),
        catchError((error) => {
          this.setAuthenticated(false);
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

  logout() {
    this.setAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/auth/login']); // Redirige al usuario a /auth/login
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  setAuthenticated(isAuthenticated: boolean): void {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }
}
