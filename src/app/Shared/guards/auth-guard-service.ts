import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/auth/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthenticationService, private _route: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this._authService.isAuthenticated()) {
            return true;
        }

        this._route.navigate(['/login']);
        return false;
    }

}

