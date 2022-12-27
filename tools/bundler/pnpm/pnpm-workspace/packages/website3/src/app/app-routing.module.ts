import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login.component';
import { UsersComponent } from './views/users.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, data: { name: 'login', auth: false }, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, data: { name: 'users', auth: true }, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
