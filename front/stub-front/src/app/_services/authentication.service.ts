import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, ResponseType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { JwtHelper } from 'angular2-jwt';
import { UrlService } from './url.service';
import { GeneralService } from './general.service';

@Injectable()
export class AuthenticationService {

    currentUser: any;
    token: any;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private http: Http,
        private generalService: GeneralService,
        private urlService: UrlService,
        private router: Router) {

        if (localStorage.getItem('currentUser')) {
            try {
                var currentTokenUser = JSON.parse(localStorage.getItem('currentUser')).token;
                this.token = currentTokenUser;
                this.currentUser = this.jwtHelper.decodeToken(this.token);
            } catch (e) {
                console.debug("ERROR CONSTRUCTOR AUTH-SERVICE: " + e);
                this.logout();
            }
        }
    }

    getCurrentRol() {
        return this.currentUser.role;
    }

    getCurrentIdRol() {
        return this.currentUser.idRole;
    }

    login(username: string, password: string): Observable<boolean> {
        let body = {
            username,
            password
        }
        return this.http.post(this.urlService.login(), body)
            .map((response: Response) => {
                let token = response.headers.get('authorization');
                if (token) {
                    try {
                        this.token = token;
                        this.currentUser = this.jwtHelper.decodeToken(token);
                        localStorage.setItem('currentUser', JSON.stringify({ token: token, refreshToken: "" }));
                    } catch (e) {
                        console.debug("ERROR LOGIN RESPONSE AUTH-SERVICE: " + e);
                        this.logout();
                    }

                }
                return token;
            }).catch(err => {
                console.log("ERROR LOGIN CALL AUTH-SERVICE: " + err);
                if (err.status === 403 || err.status === 401) {
                    this.logout();
                }
                if (err.status === 500) {
                    this.generalService.notifyOther("error.servidor");
                }
                if (err.status === 0 && err.statusText === "") {
                    this.generalService.notifyOther("error.servidor.caido");
                }
                return Observable.throw(err);
            });
    }

    signup(username: string, password: string, email: string): Observable<boolean> {
        let body = {
            username,
            password,
            email
        }
        return this.http.post(this.urlService.signup(), body)
            .map((response: Response) => {
                let resJSON = response.json();
                if (resJSON.success) {
                    return true;
                } else {
                    return false;
                }
            }).catch(err => {
                console.log("ERROR SIGNUP CALL AUTH-SERVICE: " + err);
                if (err.status === 403 || err.status === 401) {
                    this.logout();
                }
                if (err.status === 500) {
                    this.generalService.notifyOther("error.servidor");
                }
                if (err.status === 0 && err.statusText === "") {
                    this.generalService.notifyOther("error.servidor.caido");
                }
                return Observable.throw(err);
            });
    }

    logout(): void {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    isLogged(): boolean {
        try {
            let objToken = localStorage.getItem('currentUser');
            if (objToken) {
                let token = JSON.parse(objToken).token;
                let user = this.jwtHelper.decodeToken(token);
                if (user && !this.jwtHelper.isTokenExpired(token)) {
                    return true;
                }
            }
            return false
        } catch (e) {
            console.debug("ERROR ISLOGGED AUTH-SERVICE: " + e);
            this.logout();
        }
    }

    isRole(role: String): boolean {
        if (!this.isLogged()) {
            return false;
        } else {
            if (this.currentUser.role === role) {
                return true;
            } else {
                return false;
            }
        }
    }

    getToken() {
        if (!this.isLogged()) {
            return null;
        } else {
            return this.token;
        }
    }

    getCurrentUser(): any {
        if (!this.isLogged()) {
            return null;
        } else {
            return this.currentUser;
        }
    }
}
