import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {catchError, from, lastValueFrom} from "rxjs";
import {inject} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../auth/auth.service";
import {errorCodes} from "../error";

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toast = inject(ToastrService)
  return from(addBearerToken(req, next)).pipe(catchError((e => {
    if (e?.status >= 400)
      toast.error(errorCodes[e?.error?.code] || `Upss! Coś poszło nie tak [${e?.status}]`)
    throw e
  })));
}

const addBearerToken = async (req: HttpRequest<any>, next: HttpHandlerFn,): Promise<HttpEvent<any>> => {
  const authService = inject(AuthService)
  const token = await authService.getTokenPromise();
  if (token) {
    req = req.clone({
      url: req.url.startsWith("http") ? req.url : `${environment.url}${req.url}`,
      setHeaders: req.url.startsWith("http") ? {} : {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return lastValueFrom(next(req));
};
