import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmAccountComponent } from './module/auth/confirm-account/confirm-account.component';
import { LoginComponent } from './module/auth/login/login.component';
import { SignupComponent } from './module/auth/signup/signup.component';
import { PageNotFoundComponent } from './module/shared/components/page-not-found/page-not-found.component';
import { AuthCanActivateGuard } from './module/auth/auth.guard';
import { LoggedInAuthGuard } from './module/auth/loggedIn.gurd';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'confirmemail', component: ConfirmAccountComponent, canActivate: [LoggedInAuthGuard]},
  {path: 'user', canActivate: [AuthCanActivateGuard], loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
