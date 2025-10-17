import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-jobs',
  imports: [CommonModule,FormsModule],
  templateUrl: './candidate-jobs.component.html',
  styleUrl: './candidate-jobs.component.css'
})
export class CandidateJobsComponent {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchText = '';
  selectedExp = '';
  user: any;
  
  // Modal properties
  showModal = false;
  selectedJob: any = null;
  applicationForm = {
    candidateName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    resumeFileName: '',
    coverLetter: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.loadJobs();
  }

  loadJobs() {
    this.http.get<any[]>('https://jobfile.onrender.com/jobs').subscribe(res => {
      this.jobs = res;
      this.filteredJobs = res;
    });
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(j =>
      j.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedExp === '' || j.experience === this.selectedExp)
    );
  }

  openApplyModal(job: any) {
    this.selectedJob = job;
    this.showModal = true;
    // Pre-fill with user data
    this.applicationForm.candidateName = this.user.name;
    this.applicationForm.email = this.user.email;
    this.applicationForm.phone = '';
    this.applicationForm.resume = null;
    this.applicationForm.resumeFileName = '';
    this.applicationForm.coverLetter = '';
  }

  closeModal() {
    this.showModal = false;
    this.selectedJob = null;
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.resume = file;
      this.applicationForm.resumeFileName = file.name;
    }
  }

  submitApplication() {
    // Validation
    if (!this.applicationForm.candidateName || !this.applicationForm.email || !this.applicationForm.phone) {
      alert('Please fill all required fields');
      return;
    }

    const app = {
      jobId: this.selectedJob.id,
      candidateId: this.user.id,
      candidateName: this.applicationForm.candidateName,
      email: this.applicationForm.email,
      phone: this.applicationForm.phone,
      resumeFileName: this.applicationForm.resumeFileName,
      coverLetter: this.applicationForm.coverLetter,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    this.http.post('https://jobfile.onrender.com/applications', app).subscribe(() => {
      alert('Job applied successfully!');
      this.sendNotificationToEmployer(this.selectedJob, this.user.name);
      this.closeModal();
    });
  }

  sendNotificationToEmployer(job: any, name: string) {
    this.http.get<any[]>(`https://jobfile.onrender.com/users?role=employer`).subscribe(users => {
      const employer = users.find(u => u.id === job.postedBy);
      if (employer) {
        employer.notifications.push(`${name} applied for ${job.title}`);
        this.http.patch(`https://jobfile.onrender.com/users/${employer.id}`, { notifications: employer.notifications }).subscribe();
      }
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
