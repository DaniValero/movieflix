import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string = 'en-US';

  constructor(
  private _transLoco: TranslocoService) { }

  setLanguage(language: string): void {
    console.log(language)
    this.currentLanguage = language
    this._transLoco.setActiveLang(language)
  }

  getLanguage() {
    return this.currentLanguage;
  }
}
