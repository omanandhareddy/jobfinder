import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { JobService } from '../job.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Job } from '../model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  imports: [CommonModule,FormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
form: Partial<Job> = {
    title: '',
    companyName: '',
    location: '',
    description: '',
    experience: '0-2 years',
    salary: ''
  };
  editing = false;
  editId?: number;

  constructor(private jobSvc: JobService, private userSvc: UserService, private router: Router) {}

  async ngOnInit() {
    const st: any = history.state;
    if (st && st.editJob) {
      this.editing = true;
      this.editId = st.editJob.id;
      this.form = { ...st.editJob };
    }
  }

  async generateJobId(): Promise<string> {
    const jobs = await firstValueFrom(this.jobSvc.getJobs());
    const maxId = jobs.reduce((acc, j) => Math.max(acc, j.id || 0), 0);
    const num = (maxId + 1).toString().padStart(4, '0');
    return `JOB-${num}`;
  }

  async submit() {
    if (!this.form.title || !this.form.companyName || !this.form.location) {
      alert('Title, Company and Location are required');
      return;
    }

    if (this.editing && this.editId) {
      await firstValueFrom(this.jobSvc.updateJob(this.editId, this.form));
      alert('Job updated');
      this.router.navigate(['/manage-jobs']);
      return;
    }

    const jobId = await this.generateJobId();
    const employer = JSON.parse(localStorage.getItem('user') || '{}');

    const newJob: Job = {
      jobId,
      title: this.form.title!,
      companyName: this.form.companyName!,
      location: this.form.location!,
      description: this.form.description || '',
      experience: this.form.experience as any,
      salary: this.form.salary || '',
      postedBy: employer.id,
      postedDate: new Date().toISOString(),
      active: true
    };

    const created = await firstValueFrom(this.jobSvc.createJob(newJob));

    // Notify all candidates about new job
    const note = { id: '' + Date.now(), text: `New Job: ${newJob.title} at ${newJob.companyName}`, date: new Date().toISOString(), read: false };
    await this.userSvc.pushNotificationToAllCandidates(note);

    alert('Job created and candidates notified');
    this.router.navigate(['/manage-jobs']);
  }

  cancel() { this.router.navigate(['/manage-jobs']); }
  go(path: string) { this.router.navigate([path]); }
}
