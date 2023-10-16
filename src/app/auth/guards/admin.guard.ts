import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAdmin = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {

      if (!isAuthenticated) {
        router.navigate(['/'])
      } else if (isAuthenticated && !authService.checkAdmin()) {
        router.navigate(['movies/popular'])
      }

    })
  );
};

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => checkAdmin();

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => checkAdmin();
