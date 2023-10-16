import { Injectable } from '@angular/core';
import { UserService } from 'src/app/auth/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _favoriteMovies = 'favoriteMovies';
  private _favoriteSeries = 'favoriteSeries';
  private _unsubscribe$ = new Subject<boolean>

  constructor(
    private _userService: UserService
  ) {}

  getFavoriteMovies(): number[] {
    const favoritesStr = localStorage.getItem(this._favoriteMovies);
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  }

  addToFavoriteMovies(movieId: number): void {
    const favorites = this.getFavoriteMovies();
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem(this._favoriteMovies, JSON.stringify(favorites));


      this._userService.addMovietoUser(favorites)
        .pipe(
        takeUntil(this._unsubscribe$)
        )
        .subscribe()

    }
  }

  removeFromFavoriteMovies(movieId: number): void {
    const favorites = this.getFavoriteMovies();
    const index = favorites.indexOf(movieId);

    if (index !== -1) {

      favorites.splice(index, 1);
      localStorage.setItem(this._favoriteMovies, JSON.stringify(favorites));

      this._userService.removeMovieFromUser(favorites)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe();
    }
  }

  getFavoriteSeries(): number[] {
    const favoritesStr = localStorage.getItem(this._favoriteSeries);
    return favoritesStr ? JSON.parse(favoritesStr) : [];
  }

  addToFavoriteSeries(serieId: number): void {
    const favorites = this.getFavoriteSeries();
    
    if (!favorites.includes(serieId)) {

      favorites.push(serieId);
      localStorage.setItem(this._favoriteSeries, JSON.stringify(favorites));
      this._userService.addSerieToUser(favorites)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe();
    }
  }

  removeFromFavoriteSeries(serieId: number): void {
    const favorites = this.getFavoriteSeries();
    const index = favorites.indexOf(serieId);

    if (index !== -1) {

      favorites.splice(index, 1);
      localStorage.setItem(this._favoriteSeries, JSON.stringify(favorites));
      this._userService.removeSerieFromUser(favorites)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe();
    }
  }

  logout() {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}
