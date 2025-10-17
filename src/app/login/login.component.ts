import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.getUsers().subscribe((users: any[]) => {
      const user = users.find(
        u => u.email === this.email && u.password === this.password
      );

      if (user) {
        this.auth.saveUser(user);

        if (user.role === 'employer') {
          this.router.navigate(['/employer-home']);
        } else {
          this.router.navigate(['/candidate-home']);
        }
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
