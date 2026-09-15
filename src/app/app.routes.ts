import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { CertificatePreview } from './features/certificate-preview/certificate-preview';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(c => c.LoginComponent)
    },
    {
        path: 'certificates/preview',
        component: CertificatePreview,
    },
    {
        path: 'certificates/Verification/:id',
        loadComponent: () => import('./features/certificate-verification/certificate-verification').then(c => c.CertificateVerificationComponent)
    },
    {
        path: '',
        loadComponent: () => import('./layout/main-layout/main-layout').then(c => c.MainLayout),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard').then(c => c.Dashboard)
            },
            {
                path: 'certificates',
                loadComponent: () => import('./features/certificates/certificates').then(c => c.Certificates)
            },
            {
                path: 'certificates/create',
                loadComponent: () => import('./features/create-certificate/create-certificate').then(c => c.CreateCertificate)
            },
            {
                path: 'expired-courses',
                loadComponent: () => import('./features/expired-courses/expired-courses').then(c => c.ExpiredCoursesComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings').then(c => c.SettingsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
