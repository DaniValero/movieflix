import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    SearchBoxComponent,
    LayoutComponent,
    CardListComponent,
    WelcomePageComponent,
    LanguageSelectorComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, TranslocoModule],
  exports: [
    SearchBoxComponent,
    LayoutComponent,
    CardListComponent,
    TranslocoModule,
  ],
})
export class SharedModule {}
