import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentRoute: string = '';
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this._router.url.split('/')[1];
      }
    });
  }

  navigateHome() {
    this._router.navigate(['/']);
  }

  navigateToProfile(id: number) {
    this._router.navigate([`auth/user/${id}/profile`])
  }

  navigateToLogin() {
    this._router.navigate(['auth/login'])
  }

  getCurrentRoute(): string {
    return this.currentRoute;
  }
}
