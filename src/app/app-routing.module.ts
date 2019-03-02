import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './Shared/guards/auth-guard-service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'menu', component: MenuComponent }
  { path: 'menu', loadChildren: './menu/menu.module#MenuModule', canActivate: [AuthGuard] },
  { path: 'login', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
