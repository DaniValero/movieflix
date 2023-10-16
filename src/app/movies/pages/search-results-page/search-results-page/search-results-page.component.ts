import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  switchMap, Subject, takeUntil, of } from 'rxjs';
import { Movie, Result } from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from 'src/app/movies/services/movies.service';


@Component({
  selector: 'search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss'],
})
export class SearchResultsPageComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap((params) => {
          const routeSegments = this.activatedRoute.snapshot.routeConfig?.path;

          const moviename = params['moviename'];
          const genreid = params['genreid'];

          if (routeSegments === 'search/:moviename') {
            return this.moviesService.searchMoviesByName(moviename);
          } else if (routeSegments === 'genre/:genreid') {
            return this.moviesService.searchByGenre(genreid);
          } else {
            return of({} as Result);
          }
        })
      )
      .subscribe((result) => this.movies = result.results);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
