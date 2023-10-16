import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil, map } from 'rxjs';
import { SeriesService } from '../../services/series.service';
import { Genre, Season, SerieDetail } from '../../interfaces/serie-detail.interface';
import { Cast } from '../../interfaces/cast.interface';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.scss'],
})
export class SeriesDetailComponent implements OnInit, OnDestroy {
  public serie$?: Observable<SerieDetail>;

  public genres$?: Observable<Genre[]>;

  public seasons$?: Observable<Season[]>;

  public cast$?: Observable<Cast>;

  public favorite: boolean = false;

  private _unsubscribe$ = new Subject();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _seriesService: SeriesService,
    private _favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.serie$ = this._activatedRoute.params.pipe(
      takeUntil(this._unsubscribe$),
      switchMap(({ id }) => {
        return this._seriesService.getSerieById(id);
      })
    );

    this.serie$.pipe(takeUntil(this._unsubscribe$)).subscribe((serie) => {
      if (serie) {
        this.favorite = this.isSerieInFavorites(serie.id);
      } else {
        this.favorite = false;
      }
    });

    this.cast$ = this._activatedRoute.params.pipe(
      takeUntil(this._unsubscribe$),
      switchMap(({ id }) => {
        return this._seriesService.getCastMembers(id);
      })
    );

    this.seasons$ = this.serie$.pipe(
      map((serie) => (serie ? serie.seasons : []))
    );
  }

  isSerieInFavorites(id: number): boolean {
    const favorites = this._favoritesService.getFavoriteSeries();
    return favorites.includes(id);
  }

  toggleFavorite(): void {
    this.favorite = !this.favorite;
    this.serie$!.pipe(takeUntil(this._unsubscribe$)).subscribe((serie) => {
      if (!this.isSerieInFavorites(serie.id)) {
        this._favoritesService.addToFavoriteSeries(serie.id);
      } else if (this.isSerieInFavorites(serie.id)) {
        this._favoritesService.removeFromFavoriteSeries(serie.id);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
