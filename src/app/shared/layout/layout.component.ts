import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.scss'],
  // providers: [NavigationService]
})
export class LayoutComponent implements OnInit{
  public movieItems: MenuItem[] = [];
  public seriesItems: MenuItem[] = [];
  public isAuthenticated?: boolean
  public isAdmin?: boolean;

  constructor(
    private _navigationService: NavigationService,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.movieItems = [
      {
        label: 'Most Popular',
        routerLink: ['/movies/popular'],
        icon: 'bi-fire',
      },
      {
        label: 'Top Rated',
        routerLink: ['/movies/top'],
        icon: 'bi-trophy-fill',
      },
      {
        label: 'Now Playing',
        routerLink: ['/movies/now-playing'],
        icon: 'bi-ticket-perforated-fill',
      },
      // {
      //   label: 'Favorites',
      //   routerLink: ['/movies/favorites'],
      //   icon: 'bi bi-suit-heart-fill',
      // },
    ];

    this.seriesItems = [
      {
        label: 'Most Popular',
        routerLink: ['/series/popular'],
        icon: 'bi-fire',
      },
      {
        label: 'Top Rated',
        routerLink: ['/series/top'],
        icon: 'bi-trophy-fill',
      },
      // {
      //   label: 'Favorites',
      //   routerLink: ['/series/favorites'],
      //   icon: 'bi bi-suit-heart-fill',
      // },
    ];
  }

  ngOnInit() {
    this.checkAuthentication()
  }

  checkAuthentication() {
    if (this._authService.checkAuthentication()) {
      this.isAuthenticated = true
    }

    if (this._authService.checkAdmin()) {
      this.isAdmin = true
    }
  }

  navigateToLogin() {
    this._navigationService.navigateToLogin()
  }

  logout() {
    this._authService.logout();
    this.navigateToLogin()
  }

  navigateToProfile() {
    const userId = this._authService.currentUser!.id

    if (userId) {
      this._navigationService.navigateToProfile(userId!);
    } else {
      this._navigationService.navigateHome()
    }
  }

  navigateToAdminPanel() {
    if (this.isAdmin) {
      this._router.navigate(['auth/admin'])
    }
  }

  searchItem(searchTerm: string) {
    const currentRoute = this._navigationService.getCurrentRoute();

    let redirectRoute = '';
    if (currentRoute === 'movies') {
      redirectRoute = '/movies/search';
    } else if (currentRoute === 'series') {
      redirectRoute = '/series/search';
    } else {
      redirectRoute = '/';
    }


    this._router.navigate([redirectRoute, searchTerm]);
  }
}
