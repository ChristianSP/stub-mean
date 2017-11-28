import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, Response, URLSearchParams, ResponseType, RequestOptions } from '@angular/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

const nipeMaxSize = 9;

declare var moment: any;

@Injectable()
export class GeneralService {
    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    constructor(
        private http: Http,
        private urlService: UrlService,
        private route: ActivatedRoute) { }

    public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
}
