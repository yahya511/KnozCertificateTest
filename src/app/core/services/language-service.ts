import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Language } from '../mock/dictionary';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly storageKey = 'language';
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  currentLanguage = signal<Language>(this.getInitialLanguage());

  constructor() {
    this.updateDocumentAttributes(this.currentLanguage());
  }

  private getInitialLanguage(): Language {
    if (isPlatformBrowser(this.platformId)) {
      return (localStorage.getItem(this.storageKey) as Language) || 'en';
    }
    return 'en';
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, language);
    }

    this.updateDocumentAttributes(language);
  }

  private updateDocumentAttributes(language: Language): void {
    if (this.document) {
      this.document.documentElement.lang = language;
      this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }

  get direction(): 'rtl' | 'ltr' {
    return this.currentLanguage() === 'ar' ? 'rtl' : 'ltr';
  }
}
