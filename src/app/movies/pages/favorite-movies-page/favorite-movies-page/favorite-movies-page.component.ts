import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { MoviesService } from 'src/app/movies/services/movies.service';

@Component({
  selector: 'favorite-movies-page',
  templateUrl: './favorite-movies-page.component.html',
  styleUrls: ['./favorite-movies-page.component.scss'],
})
export class FavoriteMoviesPageComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public favorites?: number[];

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private _favoritesService: FavoritesService,
    private _moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getFavorites();
    this.searchMovies();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  getFavorites() {
    this.favorites = this._favoritesService.getFavoriteMovies()
  }

  searchMovies() {
    this.favorites?.map((element) => {
      this._moviesService
        .getMovieById(element)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((movie) => this.movies?.push(movie));
    });
  }
}
