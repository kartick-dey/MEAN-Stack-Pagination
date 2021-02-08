import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AppService } from '../../app.service';

@Injectable({ providedIn: 'root' })
export class LoggedInAuthGuard implements CanActivate {

    constructor(private appService: AppService, private _router: Router) { }

    canActivate(): boolean {
        if (this.appService.isLoggedIn()) {
            this._router.navigate(['/user']);
            return false;
        } else {
            return true;
        }
    }
}