import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { Movie, Result } from '../../interfaces/movie.interface';
import { PaginatorState } from '../../../shared/interfaces/pageEvent.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'most-popular-page',
  templateUrl: './most-popular-page.component.html',
  styleUrls: ['./most-popular-page.scss'],
})
export class MostPopularPage implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public allMovies: Result[] = [];
  public rows: number = 20;

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  getMovies() {
    this.moviesService
      .getAllMovies()
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response) => {
        this.allMovies = response;
        this.movies = this.allMovies[0].results;
      });
  }

  onPageChange(event: PaginatorState) {
    this.movies = this.allMovies[event.page!].results;

    const h2Element = document.getElementById('page-title');

    if (h2Element) {
      h2Element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }
}
