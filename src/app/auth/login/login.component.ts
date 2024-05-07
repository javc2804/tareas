import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  DialogData,
} from '../../components/ConfirmDialogComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username } = this.loginForm.value;
      this.authService.login({ username }).subscribe(
        (success) => {
          console.log('ss');
        },
        (error) => {
          console.log('err');
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              message: 'Usuario no encontrado. ¿Deseas crear una nueva cuenta?',
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              // Si el usuario elige crear una nueva cuenta, llama al servicio de registro
              this.authService.register({ username }).subscribe(
                (success) => {
                  console.log('ss');
                  // Maneja el éxito del registro aquí
                },
                (error) => {
                  console.log('err');
                  // Maneja el error del registro aquí
                }
              );
            }
          });
        }
      );
    }
  }
}
