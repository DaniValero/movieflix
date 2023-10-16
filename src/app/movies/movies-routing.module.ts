import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { NowPlayingPageComponent } from './pages/now-playing-page/now-playing-page/now-playing-page.component';
import { TopRatedPageComponent } from './pages/top-rated-page/top-rated-page/top-rated-page.component';
import { MostPopularPage } from './pages/most-popular-page/most-popular-page.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page/search-results-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page/favorite-movies-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'popular',
        component: MostPopularPage,
      },
      {
        path: 'top',
        component: TopRatedPageComponent,
      },
      {
        path: 'now-playing',
        component: NowPlayingPageComponent,
      },
      {
        path: 'favorites',
        component: FavoriteMoviesPageComponent,
      },
      {
        path: 'search/:moviename',
        component: SearchResultsPageComponent,
      },
      {
        path: 'genre/:genreid',
        component: SearchResultsPageComponent
      },
      {
        path: 'movie/:id',
        component: MoviePageComponent,
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
export class MoviesRoutingModule {}
