export interface Certificate {
    id: string;
    sspId?: number;
    studentName: string;
    courseName: string;
    issueDate: string;
    language: 'ar' | 'en' ;
    // template: string;
    templateId: 'classic' | 'elegant' | 'quran';
    signerId: string;
}
