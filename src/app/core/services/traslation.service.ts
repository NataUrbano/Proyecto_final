import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en' | 'it';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<Language>('es');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const languages: Language[] = ['es', 'en', 'it'];
    this.translate.addLangs(languages);
    this.translate.setDefaultLang('es');

    const browserLang = this.translate.getBrowserLang();
    const lang = browserLang && languages.includes(browserLang as Language) 
      ? browserLang as Language 
      : 'es';
    
    this.setLanguage(lang);
  }

  setLanguage(lang: Language): void {
    this.translate.use(lang);
    this.currentLangSubject.next(lang);
    localStorage.setItem('preferred-language', lang);
  }

  getTranslation(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}