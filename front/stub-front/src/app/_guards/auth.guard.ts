
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { GeneralService } from '../_services/general.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router, private authService: AuthenticationService,
        private generalService: GeneralService,
        private aRouter: ActivatedRoute) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            let canContinue = this.isRolePermitted(null);
            if (canContinue) {
                return canContinue;
            } else {
                this.generalService.notifyOther({ accion: "mostrarModal", msg: "error.autorizacion", type: "error" })
            }
        } else {
            this.generalService.notifyOther({ accion: "mostrarModal", msg: "error.autenticacion", type: "error" })
        }
        this.authService.logout();
        return false;
    }

    isRolePermitted(roles?) {
        return true
    }
}
