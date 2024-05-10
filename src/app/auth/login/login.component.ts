import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/ConfirmDialogComponent';

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
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email } = this.loginForm.value;
      this.authService.login({ email }).subscribe(
        (success) => {
          this.router.navigate(['home']);
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
              this.authService.register({ email }).subscribe(
                (success: any) => {
                  console.log('success', success);

                  // Verifica si success.ok es verdadero antes de navegar a 'home'
                  if (success.ok) {
                    this.authService.login({ email }).subscribe(
                      (success) => {
                        if (success.ok) {
                          this.router.navigate(['home']);
                        }
                      },
                      (error) => {
                        console.log('err');
                      }
                    );
                  }
                },
                (error) => {
                  console.log('err');
                }
              );
            }
          });
        }
      );
    }
  }
}
