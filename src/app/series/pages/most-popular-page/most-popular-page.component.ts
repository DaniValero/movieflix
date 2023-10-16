import { Component, OnDestroy, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Result, Serie } from '../../interfaces/serie.interface';
import { PaginatorState } from 'src/app/shared/interfaces/pageEvent.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'most-popular-page',
  templateUrl: './most-popular-page.component.html',
  styleUrls: ['./most-popular-page.component.scss'],
})
export class MostPopularPageComponent implements OnInit, OnDestroy {
  public series: Serie[] = [];
  public allSeries: Result[] = [];
  public rows: number = 20;
  
  private _unsuscribe$ = new Subject()
  

  constructor(private _seriesService: SeriesService) {}

  ngOnInit(): void {
    this.getSeries()
  }

  getSeries() {
    this._seriesService.getPopularSeries().pipe(
      takeUntil(this._unsuscribe$)
    ).subscribe((response) => {
      this.allSeries = response;
      this.series = this.allSeries[0].results;
    });
  }

  ngOnDestroy(): void {
    this._unsuscribe$.next(true)
    this._unsuscribe$.complete()
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
