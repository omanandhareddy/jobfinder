import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 form = {
    name: '',
    email: '',
    password: '',
    role: 'candidate'
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.form.name || !this.form.email || !this.form.password) {
      alert('All fields are required');
      return;
    }

    const newUser = {
      ...this.form,
      notifications: [
        `Welcome ${this.form.name}! You are registered as a ${this.form.role}.`
      ],
      appliedJobs: []
    };

    this.auth.registerUser(newUser).subscribe(() => {
      alert('Registration successful!');
      this.router.navigate(['/login']);
    });
  }
}
