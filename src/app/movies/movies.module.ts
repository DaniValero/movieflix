import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from '../material/material.module';
import { CardListComponent } from '../shared/components/card-list/card-list.component';
import { SharedModule } from '../shared/shared.module';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { TopRatedPageComponent } from './pages/top-rated-page/top-rated-page/top-rated-page.component';
import { NowPlayingPageComponent } from './pages/now-playing-page/now-playing-page/now-playing-page.component';
import { MostPopularPage } from './pages/most-popular-page/most-popular-page.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page/search-results-page.component';
import { FavoriteMoviesPageComponent } from './pages/favorite-movies-page/favorite-movies-page/favorite-movies-page.component';

@NgModule({
  declarations: [
    MostPopularPage,
    MoviePageComponent,
    TopRatedPageComponent,
    NowPlayingPageComponent,
    SearchResultsPageComponent,
    FavoriteMoviesPageComponent,
  ],
  imports: [CommonModule, MoviesRoutingModule, MaterialModule, SharedModule],
})
export class MoviesModule {}
