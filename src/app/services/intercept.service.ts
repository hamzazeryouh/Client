// Angular
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MsgCode } from '../constants/msg-code';
import { GlobalErrorService } from './global-error.service';
import { LoaderService } from './loader.service';
import { LoadingService } from './loading.service';

@Injectable({
    providedIn: 'root',
})
export class InterceptService implements HttpInterceptor {

    constructor(
        private globalErrorService: GlobalErrorService,
        private loaderService: LoaderService
    ) { }

    // intercept request and add token
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.loaderService.show();

        // modify request
    

        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) { }
                },
                error => {
                    if (error.status === 0) {
                        this.globalErrorService.add('ERRORS.NO_RESPONSE_SERVER');
                    } else if (error.status === 401 || error.status === 403) {
                        this.globalErrorService.add('ERRORS.UNAUTHORIZED');
                    } else if (error.status === 500 || error.status === 400) {
                        if (error?.error?.hasOwnProperty('messageCode')) {
                            this.messageCodeHandle(error.error);
                        } else {
                            this.globalErrorService.add('ERRORS.SERVER');
                        }
                    }
                }
            ),
            finalize(() => {
                this.loaderService.hide();
            }),
        );
    }

    private messageCodeHandle(error: any) {
        switch (error.messageCode) {
            case MsgCode.operationFailedNotFound:
                this.globalErrorService.add(error.message);
                break;
            default:
                this.globalErrorService.add(`ERRORS.${error.messageCode}`);
                break;
        }
    }
}
