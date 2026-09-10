export interface Certificate {
    id: string;
    sspId?: number;
    studentName: string;
    courseName: string;
    issueDate: string;
    language: 'ar' | 'en' ;
    templateId: 'classic' | 'elegant' | 'quran';
    signerName: string;
}
