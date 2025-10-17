import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
   {path:'login',loadComponent:()=>(import('./login/login.component').then(m=>m.LoginComponent))},
    {path:'register',loadComponent:()=>(import('./register/register.component').then(m=>m.RegisterComponent))},
    { path: 'employer-home', loadComponent: () => import('./employer-home/employer-home.component').then(m => m.EmployerHomeComponent) },
  { path: 'post-job', loadComponent: () => import('./post-job/post-job.component').then(m => m.PostJobComponent) },
  { path: 'manage-jobs', loadComponent: () => import('./manage-jobs/manage-jobs.component').then(m => m.ManageJobsComponent) },
  { path: 'applications', loadComponent: () => import('./applications/applications.component').then(m => m.ApplicationsComponent) },
  { path: 'analytics', loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent) },
  { path: 'candidate-home', loadComponent: () => import('./candidate-home/candidate-home.component').then(m => m.CandidateHomeComponent) },
{ path: 'candidate-dashboard', loadComponent: () => import('./candidate-dashboard/candidate-dashboard.component').then(m => m.CandidateDashboardComponent) },
{ path: 'candidate-jobs', loadComponent: () => import('./candidate-jobs/candidate-jobs.component').then(m => m.CandidateJobsComponent) },
{ path: 'applied-jobs', loadComponent: () => import('./applied-jobs/applied-jobs.component').then(m => m.AppliedJobsComponent) },
{ path: 'notifications', loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent) },

];
