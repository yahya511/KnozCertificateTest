import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CertificateService } from '../../core/services/certificate-service';
import { DICTIONARY, Language } from '../../core/mock/dictionary';
import { LanguageService } from '../../core/services/language-service';
import { LoadingService } from '../../core/services/loading-service';
import { Certificate } from '../../core/models/certificate';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly certificateService = inject(CertificateService);
  private readonly loadingService = inject(LoadingService);
  private readonly languageService = inject(LanguageService);
  private readonly authService = inject(AuthService);
  
  readonly dictionary = DICTIONARY;
  certificates: Certificate[] = [];
  userName = this.authService.getUserName();

  get totalCertificates(): number {
    return this.certificates.length;
  }

  get totalCourses(): number {
    return new Set(this.certificates.map(c => c.courseName)).size;
  }

  get totalStudents(): number {
    return new Set(this.certificates.map(c => c.studentName)).size;
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.certificates = [...this.certificateService.getCertificates()].reverse();
    this.userName = this.authService.getUserName();
    this.loadingService.hide();
  }

  get currentLanguage(): Language {
    return this.languageService.currentLanguage();
  }

  getText(key: keyof typeof DICTIONARY.en): string {
    return this.dictionary[this.currentLanguage][key];
  }
}
