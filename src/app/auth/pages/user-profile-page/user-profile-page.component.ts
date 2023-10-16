import { Serie } from 'src/app/series/interfaces/serie.interface';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from 'src/app/movies/services/movies.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { SeriesService } from 'src/app/series/services/series.service';
import { FormService } from 'src/app/shared/services/form.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  providers: [MessageService],
})
export class UserProfilePageComponent {
  public userName?: string;
  private _userEmail?: string;
  private _userId?: number;
  public successToast?: boolean;
  public userDetailsForm?: FormGroup;
  public movies: Movie[] = [];
  public series: Serie[] = [];
  public favorites?: number[];
  public favorites2?: number[];

  public showUserDetails: boolean = false;

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private _favoritesService: FavoritesService,
    private _moviesService: MoviesService,
    private _authService: AuthService,
    private _seriesService: SeriesService,
    private _fb: FormService,
    private _messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
    this.getUserForm();
  }

  getUser() {
    this.userName = this._authService.currentUser?.name;
    this._userEmail = this._authService.currentUser?.email;
    this._userId = this._authService.currentUser?.id;
  }

  getFavorites() {
    this.favorites = this._favoritesService.getFavoriteMovies();
    this.searchMovies();
    this.favorites2 = this._favoritesService.getFavoriteSeries();
    this.searchSeries();
  }

  getUserForm() {
    this.userDetailsForm = this._fb.createRegistrationForm();
    this.userDetailsForm.patchValue({
      name: this.userName,
      email: this._userEmail,
    });
  }

  toggleUserDetails() {
    this.showUserDetails = !this.showUserDetails;
  }

  saveUserDetails() {
    if (this.userDetailsForm?.valid) {
      const name = this.userDetailsForm.get('name')?.value;
      const email = this.userDetailsForm.get('email')?.value;
      const password = this.userDetailsForm.get('password')?.value;
      const password2 = this.userDetailsForm.get('password2')?.value;

      if (password === password2) {
        this._authService
          .updateUser(name, email, password, this._userId!)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(() => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Account updated succesfully',
            });
            this.showUserDetails = false;
          });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error, please try again',
        });
      }
    }
  }

  searchMovies() {
    this.favorites?.map((element) => {
      this._moviesService
        .getMovieById(element)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((movie) => this.movies?.push(movie));
    });
  }

  searchSeries() {
    this.favorites2?.map((element) => {
      this._seriesService
        .getSerieById(element)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe((serieDetail) => {
          const serie: Serie = {
            id: serieDetail.id,
            name: serieDetail.name,
            backdrop_path: serieDetail.backdrop_path,
            first_air_date: serieDetail.first_air_date,
            origin_country: serieDetail.origin_country,
            original_name: serieDetail.original_name,
            overview: serieDetail.overview,
            poster_path: serieDetail.poster_path,
            vote_average: serieDetail.vote_average,
          };
          this.series?.push(serie);
        });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
