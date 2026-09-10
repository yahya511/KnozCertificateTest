import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VerificationData {
  status: boolean;
  message: string;
  record: {
    course: {
      sspId: number;
      subjectId: number;
      studentName?: string;
      planName: string;
      subjectName: string;
      teacherName: string;
      sessionsCount: number;
      duration: number;
      subscribeDate: string;
      monitorName: string;
      coursePattern: { dayOfWeek: number; time: string }[];
    };
    sessions: {
      sessionId: number;
      sessionDate: string;
      sessionEndDate: string;
      isStudentAttended: boolean;
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private readonly http = inject(HttpClient);
  
  // URL to backend proxy
  private readonly verifyUrl = '/api/verify';

  verifyCertificate(sspId: string): Observable<VerificationData> {
    return this.http.post<VerificationData>(this.verifyUrl, { sspId });
  }
}
