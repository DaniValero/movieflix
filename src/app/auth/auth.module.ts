import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page/admin-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    UserProfilePageComponent,
    AdminPageComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, MaterialModule, ReactiveFormsModule],
})
export class AuthModule {}
