import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie, Result } from 'src/app/movies/interfaces/movie.interface';
import { PaginatorState } from 'src/app/shared/interfaces/pageEvent.interface';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'now-playing-page',
  templateUrl: './now-playing-page.component.html',
  styleUrls: ['./now-playing-page.component.scss'],
})
export class NowPlayingPageComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];

  public allMovies: Result[] = [];

  public rows: number = 20;

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getMovies()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }


  getMovies() {
    this.moviesService.getNowPlaying().subscribe((response) => {
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
