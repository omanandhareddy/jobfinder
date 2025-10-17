import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applied-jobs',
  imports: [CommonModule],
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent {
  applications: any[] = [];
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.http.get<any[]>(`https://jobfile.onrender.com/applications?candidateId=${this.user.id}`)
      .subscribe(res => this.applications = res);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
