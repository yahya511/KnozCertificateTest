import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

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
  
  // URL to get token
  private readonly loginUrl = 'https://knoz-api.knoz.online/api/Auth/login';
  // URL to get course details
  private readonly courseDetailsUrl = 'https://knoz-api.knoz.online/api/Monitor/Assigned-Student-Course-Details';

  verifyCertificate(sspId: string): Observable<VerificationData> {
    const loginPayload = {
      usernameOrEmail: "Yahya511",
      password: "Yahya@2026",
      appType: 0
    };

    return this.http.post<any>(this.loginUrl, loginPayload).pipe(
      switchMap(response => {
        const token = response.record?.token || response.token;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        return this.http.get<VerificationData>(`${this.courseDetailsUrl}?SSPId=${sspId}`, { headers });
      })
    );
  }
}
