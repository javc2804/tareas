import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component'; // importa HomeComponent
import { AuthGuard } from './auth/auth.guard'; // importa AuthGuard

import { LoginGuard } from './auth/login/login.guard'; // Importa LoginGuard

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent, canActivate: [LoginGuard] }, // Usa LoginGuard aquí
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
