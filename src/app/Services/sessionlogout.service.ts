import { Injectable } from '@angular/core';
import { AuthenticationService } from '../Services/auth/authentication.service';
import { Router } from '@angular/router';

const store: any = '';

const MINUTES_UNITL_AUTO_LOGOUT = 1; // in mins
const CHECK_INTERVAL = 1000; // in ms
const STORE_KEY = 'lastAction';

@Injectable()

export class SessionlogoutService {

  public getLastAction() {
    // tslint:disable-next-line:radix
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    this.check();
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    // if (isTimeout && this.auth.loggedIn)
    if (isTimeout) {
      // alert('logout');
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
