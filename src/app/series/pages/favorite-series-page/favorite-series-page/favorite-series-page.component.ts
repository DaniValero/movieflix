import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Serie } from 'src/app/series/interfaces/serie.interface';
import { SeriesService } from 'src/app/series/services/series.service';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'app-favorite-series-page',
  templateUrl: './favorite-series-page.component.html',
  styleUrls: ['./favorite-series-page.component.scss'],
})
export class FavoriteSeriesPageComponent implements OnInit, OnDestroy {
  public series: Serie[] = [];
  public favorites?: number[];

  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private _favoritesService: FavoritesService,
    private _seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    this.getFavorites();
    this.searchSeries();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  getFavorites() {
    this.favorites = this._favoritesService.getFavoriteSeries();
  }

  searchSeries() {
    this.favorites?.map((element) => {
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
}
