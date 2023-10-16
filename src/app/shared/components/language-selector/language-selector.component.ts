import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface Language {
  name: string;
  code: string;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  public languages?: Language[];
  public selectedLanguage?: string;

  constructor(private _languageService: LanguageService) {
    
  }

  ngOnInit() {
    this.selectedLanguage = this._languageService.getLanguage();
    
    this.languages = [
      { name: 'English', code: 'en-US' },
      { name: 'Spanish', code: 'es-ES' },
      { name: 'Italian', code: 'it-IT' },
      { name: 'French', code: 'fr-FR' },
      { name: 'Portuguese', code: 'pt-PT' },
    ];
  }

  changeLanguage(lang: Language) {
    this._languageService.setLanguage(lang.code); 
  }
}
