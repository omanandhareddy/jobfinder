import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent {
 jobs: any[] = [];
  displayed: any[] = [];
  search = '';
  filterExp = '';
  sortBy = 'newest';

  constructor(private jobSvc: JobService, private router: Router) {}

  async ngOnInit(){
    await this.loadJobs();
  }

  async loadJobs(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const jobs = await firstValueFrom(this.jobSvc.getJobs(`postedBy=${user.id}`));
    this.jobs = jobs;
    this.filter();
  }

  filter(){
    let out = [...this.jobs];
    if (this.search) out = out.filter(j => j.title.toLowerCase().includes(this.search.toLowerCase()));
    if (this.filterExp) out = out.filter(j => j.experience === this.filterExp);
    if (this.sortBy === 'newest') out = out.sort((a,b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    else out = out.sort((a,b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    this.displayed = out;
  }

  edit(job: any) {
    this.router.navigate(['/post-job'], { state: { editJob: job } });
  }

  async del(job: any) {
    if (!confirm('Delete this job?')) return;
    await firstValueFrom(this.jobSvc.deleteJob(job.id));
    alert('Deleted');
    await this.loadJobs();
  }

  go(path: string) { this.router.navigate([path]); }
}
