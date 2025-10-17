import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { ApplicationService } from '../application.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
totalJobs = 0;
  totalApplications = 0;
  breakdown: any = {};

  constructor(private jobSvc: JobService, private appSvc: ApplicationService) {}

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const jobs = await firstValueFrom(this.jobSvc.getJobs(`postedBy=${user.id}`));
    const jobIds = jobs.map(j => j.id);
    this.totalJobs = jobs.length;

    const allApps = await firstValueFrom(this.appSvc.getApplications());
    const apps = allApps.filter(a => jobIds.includes(a.jobId));
    this.totalApplications = apps.length;
    this.breakdown = apps.reduce((acc: any, cur: any) => { acc[cur.status] = (acc[cur.status]||0) + 1; return acc; }, {});
  }

  go(path: string) { (window as any).location.href = `/${path}`; }
}
