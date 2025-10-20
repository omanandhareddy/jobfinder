import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  imports: [],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {
appliedCount = 0;
  notificationsCount = 0;
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.user = JSON.parse(localUser);
      this.loadData();
    }
  }

  loadData() {
    this.http.get<any[]>(`https://jobfile.onrender.com/applications?candidateId=${this.user.id}`)
      .subscribe(res => this.appliedCount = res.length);
    this.http.get<{ notifications?: any[] }>(`https://jobfile.onrender.com/users/${this.user.id}`)
      .subscribe(res => this.notificationsCount = res.notifications?.length || 0);
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
