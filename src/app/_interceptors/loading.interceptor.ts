import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { GlobalErrorService } from '../services/global-error.service';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { ToastService } from '../services/Toast.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';


/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
@Output() Error=new EventEmitter(); 
  constructor(
    private _loading: LoadingService,
    private globalErrorService: GlobalErrorService,
    private toastService:ToastService,
    private toastEvokeService: ToastEvokeService
  ) { }

/*   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(catchError((err) => {
         this._loading.setLoading(false, request.url);
         return err;
       }))
       .pipe(map<HttpEvent<unknown>, unknown>((evt: HttpEvent<unknown>) => {
        if (evt instanceof HttpResponse) {
           this._loading.setLoading(false, request.url);
        }
        return evt;
    }));
   }
   */


/*
   intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
): Observable<HttpEvent<unknown>> {
  debugger;
  this._loading.setLoading(true, request.url);

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
                        //this.messageCodeHandle(error.error); // custom code message come from backend 
                    } else {
                        this.globalErrorService.add('ERRORS.SERVER');
                    }
                }
            }
        ),
        finalize(() => {
          this._loading.setLoading(false, request.url);
        }),
    );
}
*/

 // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //  this._loading.setLoading(true, request.url);
   // return next.handle(request).pipe(
    //  finalize(() => {
     //   this._loading.setLoading(false, request.url);
     // })
   // );
 // }



 intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  this._loading.setLoading(true, request.url);
  return next.handle(request)
      .pipe(
          catchError((error: HttpErrorResponse) => {
              let errorMsg = '';
              if (error.error instanceof ErrorEvent) {
                  console.log('This is client side error');
                debugger;
                 //this.toastService.show('Error Server', { classname: 'bg-danger text-light', delay: 15000 });
                 this.toastEvokeService.warning('Error Server !', 'Error Server !').subscribe();
                  errorMsg = `Error: ${error.error.message}`;
                  this.Error.emit(errorMsg);
                  console.log(errorMsg);
              } else {
                this.toastEvokeService.warning('Error Server !', 'Error Server !').subscribe();
                  console.log('This is server side error');
                  errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              }
              console.log(errorMsg);
              return throwError(errorMsg);
          }),
          finalize(() => {
            this._loading.setLoading(false, request.url);
          }),
      )
}


ngOnDestroy(): void {
  this.toastService.clear();
}
}
