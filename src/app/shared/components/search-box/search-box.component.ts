import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, debounceTime, Subscription, takeUntil } from 'rxjs';
import { Genre } from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from '../../../movies/services/movies.service';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();
  private _unsubscribe$ = new Subject<boolean>();
  public searchOption: string = 'name';
  public genres?: Genre[] = [];

  constructor(private moviesService: MoviesService,
    private _navigationService: NavigationService,
    private _router: Router
  ) { }

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });

    this.moviesService
      .getAllGenres()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((response) => (this.genres = response.genres));
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

  onSearchOptionChange(selectedOption: Event): void {
    this.searchOption = (selectedOption.target as HTMLInputElement).value;
    if (this.searchOption === "genre") {
      
    }
  }

  setGenre(event: Event) {
    const selectedGenre = (event.target as HTMLInputElement).value;

    if (selectedGenre === 'null') return;
    const newGenre = this.genres?.find(
      (genre) => genre.id === parseInt(selectedGenre)
    )

    this.searchItem(selectedGenre);

  }

  searchItem(searchTerm: string) {
    const currentRoute = this._navigationService.getCurrentRoute();

    let redirectRoute = '';
    if (currentRoute === 'movies') {
      redirectRoute = '/movies/genre';
    } else if (currentRoute === 'series') {
      redirectRoute = '/series/genre';
    } else {
      redirectRoute = '/';
    }

    this._router.navigate([redirectRoute, searchTerm]);
  }
}
