import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { HomeComponent } from '../home/home.component';
import { Home1Component } from '../home1/home1.component';
import { SessionlogoutService } from '../Services/sessionlogout.service';
@NgModule({
  declarations: [MenuComponent, Home1Component, HomeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ],
  providers: [SessionlogoutService]
})
export class MenuModule { }
