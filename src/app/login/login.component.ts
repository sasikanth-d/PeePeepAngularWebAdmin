import { Component, OnInit } from '@angular/core';
import { USerModel } from '../Models/user.model';
import { NgForm } from '@angular/forms';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../Services/auth/authentication.service';
import { AlertService } from '../Services/alert.service';
import { SessionlogoutService } from '../Services/sessionlogout.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _user: USerModel;
  constructor(private _router: Router, private alert: AlertService, private _authService: AuthenticationService,
    private _route: Router, private a: SessionlogoutService) {
      debugger;
    if (this._authService.isAuthenticated()) {
      this._route.events.subscribe(events => {
        if (events instanceof NavigationEnd) {
          if (events.url === '/') {
            this._router.navigate(['/menu']);
          }
        }
      });
    }
  }

  ngOnInit() {
    this._user = {
      username: null,
      password: null
    };
  }
  Submit(form: NgForm) {
    // this._router.navigate([{ outlets: { 'l': 'menu' } }]);
    if (form) {
      this._authService.login(this._user.username, this._user.password).subscribe((dat) => {
        this._router.navigate(['/menu']);
      },
        err => {
          this.alert.error(err);
        });
    }
  }

}
