import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private api = 'https://jobfile.onrender.com/users';

  constructor(private http: HttpClient, private router: Router) {}

 
  registerUser(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.api);
  }

  
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }


  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

 
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
