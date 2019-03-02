import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './Services/auth/authentication.service';
import { Authinterceptor } from './Services/auth/auth.interceptor';
import { AlertComponent } from './Shared/alert/alert.component';
import { AlertService } from './Services/alert.service';
import { AuthGuard } from './Shared/guards/auth-guard-service';
import { SessionlogoutService } from './Services/sessionlogout.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true }, AlertService
    , AuthGuard, SessionlogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
