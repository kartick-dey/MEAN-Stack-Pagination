import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable({ providedIn: 'root' })
export class AuthCanActivateGuard implements CanActivate {
    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    private canActivateGenericMethod(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        if (this.appService.isLoggedIn()) {
            return true;
        } else {
            this.appService.logout();
            return this.router.createUrlTree(['/login']);
        }
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.canActivateGenericMethod(route, state);
    }
}
