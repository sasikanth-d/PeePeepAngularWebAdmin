import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { HomeComponent } from '../home/home.component';
import { Home1Component } from '../home1/home1.component';

const routes: Routes = [
  {
    path: '', component: MenuComponent,

    children: [
      { path: 'home1', component: HomeComponent },
      { path: 'home2', component: Home1Component },
      { path: 'config', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
