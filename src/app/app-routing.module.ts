import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './shared/pages/welcome-page/welcome-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: 'series',
    loadChildren: () => import('./series/series.module').then((m) => m.SeriesModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: '',
    component: WelcomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
