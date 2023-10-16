import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AdminPageComponent } from './pages/admin-page/admin-page/admin-page.component';
import { canActivateGuard, canMatchGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdminPageComponent
      }
    ],
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {
        path: ':id/profile',
        component: UserProfilePageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
