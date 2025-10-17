import { Component } from '@angular/core';
import { ApplicationService } from '../application.service';
import { JobService } from '../job.service';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
   applications: any[] = [];
  jobsMap: any = {};
  showDetailsModal = false;
  selectedApplication: any = null;

  constructor(private appSvc: ApplicationService, private jobSvc: JobService, private userSvc: UserService) {}

  async ngOnInit() {
    await this.load();
  }

  async load() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const jobs = await firstValueFrom(this.jobSvc.getJobs(`postedBy=${user.id}`));
    const jobIds = jobs.map(j => j.id);
    jobs.forEach(j => this.jobsMap[j.id!] = j);

    const allApps = await firstValueFrom(this.appSvc.getApplications());
    this.applications = allApps.filter(a => jobIds.includes(a.jobId));
  }

  async changeStatus(app: any, newStatus: 'Applied' | 'Reviewed' | 'Rejected') {
    await firstValueFrom(this.appSvc.updateApplication(app.id, { status: newStatus }));
    const note = { 
      id: '' + Date.now(), 
      text: `Your application for ${this.jobsMap[app.jobId].title} is now ${newStatus}.`, 
      date: new Date().toISOString(), 
      read: false 
    };
    await this.userSvc.pushNotificationToUser(app.candidateId, note);
    alert('Status updated & candidate notified.');
    await this.load();
  }

  viewDetails(app: any) {
    this.selectedApplication = app;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedApplication = null;
  }

  go(path: string) { 
    (window as any).location.href = `/${path}`; 
  } 
}
