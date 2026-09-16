import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserInfo } from '../../core/models/auth';
import { LanguageService } from '../../core/services/language-service';
import { DICTIONARY } from '../../core/mock/dictionary';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html'
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private languageService = inject(LanguageService);

  userInfo = signal<UserInfo | null>(this.authService.getUserInfo());

  get initials(): string {
    const name = this.userInfo()?.fullName || this.userInfo()?.userName || '';
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  get countryFlagUrl(): string | null {
    const isoCode = this.userInfo()?.country?.isoCode;
    if (isoCode) {
      return `https://hatscripts.github.io/circle-flags/flags/${isoCode.toLowerCase()}.svg`;
    }
    return null;
  }

  get currentLanguage() {
    return this.languageService.currentLanguage();
  }

  getText(key: keyof typeof DICTIONARY.en): string {
    return DICTIONARY[this.currentLanguage][key] as string;
  }
}
