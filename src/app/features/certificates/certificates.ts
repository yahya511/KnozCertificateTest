import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Certificate } from '../../core/models/certificate';
import { CertificateService } from '../../core/services/certificate-service';
import { DatePipe, NgClass } from '@angular/common';
import { DICTIONARY, Language } from '../../core/mock/dictionary';
import { LanguageService } from '../../core/services/language-service';
import { LoadingService } from '../../core/services/loading-service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass],
  templateUrl: './certificates.html',
})
export class Certificates implements OnInit {
  private readonly certificateService = inject(CertificateService);
  private readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);

  readonly dictionary = DICTIONARY;
  certificates: Certificate[] = [];
  certificateToDelete: Certificate | null = null;
  isDeleteModalOpen = false;

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
    this.loadingService.hide();
  }

  viewCertificate(certificate: Certificate): void {
    this.loadingService.show();
    this.certificateService.setCertificate(certificate);
    this.router.navigate(['/certificates/preview']).finally(() => {
      this.loadingService.hide();
    });
  }

  openDeleteModal(certificate: Certificate): void {
    this.certificateToDelete = certificate;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.certificateToDelete = null;
  }

  confirmDelete(): void {
    if (!this.certificateToDelete) {
      return;
    }
    this.certificateService.deleteCertificate(this.certificateToDelete.id);
    this.certificates = [...this.certificateService.getCertificates()].reverse();
    this.closeDeleteModal();
  }

  get currentLanguage(): Language {
    return this.languageService.currentLanguage();
  }

  getText(key: keyof typeof DICTIONARY.en): string {
    return this.dictionary[this.currentLanguage][key];
  }
}
