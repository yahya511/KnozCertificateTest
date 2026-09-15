import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { DICTIONARY, Language } from '../../core/mock/dictionary';
import { LanguageService } from '../../core/services/language-service';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  readonly dictionary = DICTIONARY;
  
  isMobileSidebarOpen = false;
  pageTitleKey: keyof typeof DICTIONARY.en = 'dashboard';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.urlAfterRedirects);
    });
    this.updateTitle(this.router.url);
  }

  private updateTitle(url: string) {
    if (url.includes('certificates/create')) {
      this.pageTitleKey = 'createCertificate';
    } else if (url.includes('certificates')) {
      this.pageTitleKey = 'certificates';
    } else if (url.includes('expired-courses')) {
      this.pageTitleKey = 'expiredCourses';
    } else if (url.includes('settings')) {
      this.pageTitleKey = 'settings';
    } else {
      this.pageTitleKey = 'dashboard';
    }
  }

  openMobileSidebar(): void {
    this.isMobileSidebarOpen = true;
  }
  
  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  get currentLanguage(): Language {
    return this.languageService.currentLanguage();
  }
  
  setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }
  
  getText(key: keyof typeof DICTIONARY.en): string {
    return this.dictionary[this.currentLanguage][key];
  }
}
