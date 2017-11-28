import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable()
export class UrlService {

    private baseApiUrl = window.location.origin;
    private baseUrl = window.location.origin;

    constructor() {
        this.baseApiUrl = environment.baseApiUrl;
        this.baseUrl = environment.baseUrl;
    }

    api() {
        return this.baseApiUrl;
    }

    login() {
        return this.baseUrl + "/login";
    }

    signup() {
        return this.baseUrl + "/signup";
    }

}
