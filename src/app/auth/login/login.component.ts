import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Use the "definite assignment assertion"

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      // password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
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
}
