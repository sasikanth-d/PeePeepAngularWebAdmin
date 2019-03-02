import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/auth/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(private _router: Router, private authservice: AuthenticationService) { }

  ngOnInit() {

  }

  logout() {
    this.authservice.logout();
    this._router.navigate(['login']);
  }
}
