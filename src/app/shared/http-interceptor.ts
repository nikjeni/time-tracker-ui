import { HttpInterceptor, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventService } from './event.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private toaster: ToastrService, private event: EventService) { }
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        var httpReq = req.clone();
        this.event.dispatchLoaderEvent(true);
        return next.handle(httpReq).pipe(
            map((res: HttpResponse<HttpEvent<any>>) => {
                if (res.status >= 200) {
                    this.event.dispatchLoaderEvent(false);
                    this.toaster.success(res.body["message"], "Success", { timeOut: 3000 });
                }
                return res;
            }),
            catchError((err: HttpErrorResponse) => {
                this.event.dispatchLoaderEvent(false);
                if (err.status >= 400 || err.status >= 500) {
                    if (err.error === "Invalid user") { this.toaster.info("Press register button to signUp user", "Register First", { timeOut: 3000 }) }
                    this.toaster.error(err.statusText, err.error, { timeOut: 3000 });
                }
                return throwError(err);
            })
        )
    }
}