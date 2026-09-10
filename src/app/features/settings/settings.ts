import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { LanguageService } from '../../core/services/language-service';
import { SettingsService } from '../../core/services/settings.service';
import { Language, DICTIONARY } from '../../core/mock/dictionary';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './settings.html',
})
export class SettingsComponent {
  private readonly languageService = inject(LanguageService);
  private readonly settingsService = inject(SettingsService);
  private readonly fb = inject(FormBuilder);

  showSuccess = signal(false);

  settingsForm = this.fb.group({
    language: [this.languageService.currentLanguage()],
    defaultTemplate: [this.settingsService.defaultTemplate],
    defaultSignerName: [this.settingsService.defaultSignerName, Validators.required]
  });

  get currentLanguage(): Language {
    return this.languageService.currentLanguage();
  }

  get direction(): 'rtl' | 'ltr' {
    return this.languageService.direction;
  }

  getPageText(key: keyof typeof DICTIONARY.en): string {
    return DICTIONARY[this.currentLanguage][key];
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      
      // Update Language
      if (formValue.language && formValue.language !== this.currentLanguage) {
        this.languageService.setLanguage(formValue.language as Language);
      }

      // Update App Settings
      this.settingsService.updateSettings({
        defaultTemplate: formValue.defaultTemplate as any,
        defaultSignerName: formValue.defaultSignerName!
      });

      this.showSuccess.set(true);
      setTimeout(() => this.showSuccess.set(false), 3000);
    }
  }
}
