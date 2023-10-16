import { Component, OnDestroy, OnInit } from '@angular/core';
import { Result, Serie } from '../../interfaces/serie.interface';
import { SeriesService } from '../../services/series.service';
import { PaginatorState } from 'src/app/shared/interfaces/pageEvent.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'top-rated-page',
  templateUrl: './top-rated-page.component.html',
  styleUrls: ['./top-rated-page.component.scss'],
})
export class TopRatedPageComponent implements OnInit, OnDestroy {
  public series: Serie[] = [];
  public allSeries: Result[] = [];
  public rows: number = 20;
  
  private _unsubscribe$ = new Subject()

  constructor(private _seriesService: SeriesService) {}
  ngOnInit(): void {
    this.getSeries()
  }

  getSeries() {
    this._seriesService
      .getTopSeries().pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((response) => {
        this.allSeries = response;
        this.series = this.allSeries[0].results;
      });
  }
  
  ngOnDestroy(): void {
    this._unsubscribe$.next(true)
    this._unsubscribe$.complete()
  }

  onPageChange(event: PaginatorState) {
    this.series = this.allSeries[event.page!].results;

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
