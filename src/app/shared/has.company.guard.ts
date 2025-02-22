import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {map} from 'rxjs';

export const hasCompanyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getToken().pipe(map(t => {
    if (t?.claims['companyId']) return true
    router.navigate(['/login']);
    return false;
  }))
};
