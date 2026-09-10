import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AppSettings {
  defaultTemplate: 'classic' | 'elegant' | 'quran';
  defaultSignerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly storageKey = 'app_settings';
  private platformId = inject(PLATFORM_ID);

  private readonly defaultSettings: AppSettings = {
    defaultTemplate: 'classic',
    defaultSignerName: 'يحيى عبد الباسط' // Default Arabic signer
  };

  settings = signal<AppSettings>(this.loadSettings());

  private loadSettings(): AppSettings {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          return { ...this.defaultSettings, ...JSON.parse(stored) };
        } catch (e) {
          console.error('Failed to parse settings', e);
        }
      }
    }
    return { ...this.defaultSettings };
  }

  updateSettings(newSettings: Partial<AppSettings>): void {
    const current = this.settings();
    const updated = { ...current, ...newSettings };
    this.settings.set(updated);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(updated));
    }
  }

  get defaultTemplate() {
    return this.settings().defaultTemplate;
  }
  
  get defaultSignerName() {
    return this.settings().defaultSignerName;
  }
}
