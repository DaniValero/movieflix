import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { ActivatedRoute } from '@angular/router';
import { Serie } from '../../interfaces/serie.interface';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss'],
})
export class SearchResultsPageComponent implements OnInit, OnDestroy {
  public series: Serie[] = [];

  private _unsubscribe$ = new Subject()

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _seriesService: SeriesService
  ) {}
  ngOnInit(): void {
    this.getSearchResults()
  }

  getSearchResults() {
    this._activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribe$),
        switchMap(({ query }) => {
          return this._seriesService.searchSeriesByName(query);
        })
      )
      .subscribe((serie) => (this.series = serie.results));
  }
    
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

}
