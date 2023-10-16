import { Component, OnInit } from '@angular/core';
import { Movie, Result } from 'src/app/movies/interfaces/movie.interface';
import { PaginatorState } from 'src/app/shared/interfaces/pageEvent.interface';
import { MoviesService } from 'src/app/movies/services/movies.service';

@Component({
  selector: 'top-rated-page',
  templateUrl: './top-rated-page.component.html',
  styleUrls: ['./top-rated-page.component.scss'],
})
export class TopRatedPageComponent implements OnInit {
  public movies: Movie[] = [];
  public allMovies: Result[] = [];
  public rows: number = 20;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getTopRatedMovies().subscribe((response) => {
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
