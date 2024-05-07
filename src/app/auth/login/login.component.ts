import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(username: string, password: string) {
    // this.authService.login({ username, password }).subscribe(
    //   (success) => {
    //     // Maneja el éxito del inicio de sesión aquí
    //   },
    //   (error) => {
    //     // Maneja el error del inicio de sesión aquí
    //   }
    // );
  }
}
