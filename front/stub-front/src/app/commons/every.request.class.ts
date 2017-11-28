import { GeneralService } from '../_services/general.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';

export class EveryRequestClass {

    _headers: Headers;
    get headers(): Headers {
        return this._headers;
    }

    constructor() {
    }

    onBegin(generalService: GeneralService, authService: AuthenticationService, generandoDocumento: boolean = false) {
        this._headers = new Headers({
            'Authorization': authService.getToken(),
            'Content-Type': 'application/json; charset=UTF-8'
        });
        if (generandoDocumento) {
            generalService.notifyOther("generando-on");
        } else {
            generalService.notifyOther("loading-on");
        }
    }

    onCatch(e, generalService: GeneralService, authService: AuthenticationService) {
        console.log(e);
        if (e.status === 403 || e.status === 401) {
            authService.logout();
            generalService.notifyOther("error.auth");
        }
        if (e.status === 500) {
            generalService.notifyOther("error.servidor");
        }
        if (e.status === 0 && e.statusText === "") {
            generalService.notifyOther("error.servidor.caido");
        }
        return Observable.throw(e);
    }

    onEnd(generalService: GeneralService, generandoDocumento: boolean = false) {
        if (generandoDocumento) {
            generalService.notifyOther("generando-off");
        } else {
            generalService.notifyOther("loading-off");
        }
    }
}