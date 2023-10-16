import { Component } from '@angular/core';
import { LanguageService } from './shared/services/language.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
  
export class AppComponent {
  title = 'Movieflix';
  public currentLanguage: string;

  constructor(
    private _languageService: LanguageService,
    private _translocoService: TranslocoService
  ) {
    this.currentLanguage = this._languageService.getLanguage()
    this._translocoService.setActiveLang(this.currentLanguage)
  }


}
