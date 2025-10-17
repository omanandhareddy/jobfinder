import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employer-home',
  imports: [],
  templateUrl: './employer-home.component.html',
  styleUrl: './employer-home.component.css'
})
export class EmployerHomeComponent {
constructor(private router: Router, private auth: AuthService) {}

  go(path: string) { this.router.navigate([path]); }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
