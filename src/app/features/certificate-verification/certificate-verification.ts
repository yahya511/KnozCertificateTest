import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VerificationService, VerificationData } from '../../core/services/verification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-certificate-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-verification.html',
  styleUrl: './certificate-verification.css'
})
export class CertificateVerificationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly verificationService = inject(VerificationService);
  private readonly spinner = inject(NgxSpinnerService);

  courseData = signal<VerificationData['record'] | null>(null);
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Computed properties for specific requirements
  firstSessionDate = computed(() => {
    const data = this.courseData();
    if (!data?.sessions?.length) return null;
    
    // Sort ascending by date
    const sorted = [...data.sessions].sort((a, b) => 
      new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
    );
    return sorted[0].sessionDate;
  });

  lastSessionDate = computed(() => {
    const data = this.courseData();
    if (!data?.sessions?.length) return null;
    
    // Sort descending by date
    const sorted = [...data.sessions].sort((a, b) => 
      new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
    );
    return sorted[0].sessionDate;
  });

  daysMap: Record<number, string> = {
    0: 'الأحد',
    1: 'الإثنين',
    2: 'الثلاثاء',
    3: 'الأربعاء',
    4: 'الخميس',
    5: 'الجمعة',
    6: 'السبت'
  };

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12;
    h = h ? h : 12; 
    return `${h}:${minutes} ${ampm}`;
  }

  ngOnInit(): void {
    const sspId = this.route.snapshot.paramMap.get('id');
    
    if (sspId) {
      this.verifyCertificate(sspId);
    } else {
      this.hasError.set(true);
      this.errorMessage.set('رابط التحقق غير صحيح، يرجى مسح رمز الـ QR مرة أخرى.');
    }
  }

  verifyCertificate(sspId: string) {
    this.spinner.show();
    this.hasError.set(false);
    
    this.verificationService.verifyCertificate(sspId).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.status && res.record && res.record.course) {
          this.courseData.set(res.record);
        } else {
          this.hasError.set(true);
          this.errorMessage.set('لم نتمكن من العثور على بيانات هذه الشهادة.');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.hasError.set(true);
        this.errorMessage.set('حدث خطأ أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً.');
        console.error('Verification Error:', err);
      }
    });
  }
}
