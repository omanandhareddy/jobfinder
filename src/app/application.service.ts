import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from './model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
base = 'https://jobfile.onrender.com/applications';

  constructor(private http: HttpClient) {}

  getApplications(query = ''): Observable<Application[]> {
    const url = query ? `${this.base}?${query}` : this.base;
    return this.http.get<Application[]>(url);
  }

  createApplication(app: Application) {
    return this.http.post<Application>(this.base, app);
  }

  updateApplication(id: number, payload: Partial<Application>) {
    return this.http.patch<Application>(`${this.base}/${id}`, payload);
  }
}
