import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  notifications: any[] = [
    { text: 'Your application for Frontend Developer has been accepted!', date: new Date(), isNew: true },
    { text: 'Recruiter viewed your profile.', date: new Date(Date.now() - 3600 * 1000), isNew: false },
    { text: 'You have a new job suggestion: UI/UX Designer at DreamTech.', date: new Date(Date.now() - 86400 * 1000), isNew: true },
    { text: 'Job posting for Software Engineer expires soon.', date: new Date(Date.now() - 172800 * 1000), isNew: false }
  ];

  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.http.get<any>(`https://jobfile.onrender.com/users/${this.user.id}`).subscribe(u => {
      // Prefer user notifications from DB; if none, use default
      this.notifications = (u.notifications && u.notifications.length > 0)
        ? (u.notifications || []).sort((a: any, b: any) => Number(b.read) - Number(a.read))
        : this.notifications;
    });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
