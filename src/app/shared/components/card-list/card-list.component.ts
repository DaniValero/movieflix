import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../movies/services/movies.service';
import { Subject, takeUntil } from 'rxjs';
import { Genre, Movie } from 'src/app/movies/interfaces/movie.interface';
import { Serie } from 'src/app/series/interfaces/serie.interface';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnDestroy {
  @Input()
  public movies: Movie[] = [];
  @Input()
  public series: Serie[] = [];

  public filteredMovies?: Movie[] = [];

  public genre?: Genre;

  constructor(private router: Router, private moviesService: MoviesService) {}

  private _unsubscribe$ = new Subject<boolean>();

  ngOnInit(): void {
    this.getGenres()
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

  onMovieClick(id: number) {
    this.router.navigate(['movies/movie', id]);
  }
  
  onSerieClick(id: number) {
    this.router.navigate(['series/serie', id]);
  }
  
  getGenres() {
    this.moviesService.genre$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((newGenre) => {
        this.genre = newGenre;
        this.filterMoviesByGenre();
    });
  }
  filterMoviesByGenre() {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.genre_ids.includes(this.genre!.id)
    );
  }
}