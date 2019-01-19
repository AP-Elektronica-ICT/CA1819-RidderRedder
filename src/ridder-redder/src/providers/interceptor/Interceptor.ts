import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    private apiVersion = '1.1';

    private baseUrl = "http://ridderredder.francecentral.cloudapp.azure.com/api/v1";

    constructor(
    ) { }

    // This function serves as an HTTP interceptor
    // It is set up to be automatically used by Ionic
    // Whenever there is an HTTP request anywhere in the project
    // it gets intercepted, and the base URL is prepended to the given url.
    // The interceptor also adds HttpHeaders
    // RETURNS: Observable<HttpEvent>
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        request = request.clone({ url: `${this.baseUrl}${request.url}`, headers: headers });
        return next.handle(request);
    }
}