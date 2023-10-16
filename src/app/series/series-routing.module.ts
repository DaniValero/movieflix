import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { MostPopularPageComponent } from './pages/most-popular-page/most-popular-page.component';
import { TopRatedPageComponent } from './pages/top-rated-page/top-rated-page.component';
import { SeriesDetailComponent } from './pages/series-detail/series-detail.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { FavoriteSeriesPageComponent } from './pages/favorite-series-page/favorite-series-page/favorite-series-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'popular',
        component: MostPopularPageComponent,
      },
      {
        path: 'top',
        component: TopRatedPageComponent,
      },
      {
        path: 'favorites',
        component: FavoriteSeriesPageComponent,
      },
      {
        path: 'search/:query',
        component: SearchResultsPageComponent,
      },
      {
        path: 'serie/:id',
        component: SeriesDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'popular',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}
