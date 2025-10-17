import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
base = 'https://jobfile.onrender.com/jobs';

  constructor(private http: HttpClient) {}

  getJobs(query = ''): Observable<Job[]> {
    const url = query ? `${this.base}?${query}` : this.base;
    return this.http.get<Job[]>(url);
  }

  getJob(id: number) {
    return this.http.get<Job>(`${this.base}/${id}`);
  }

  createJob(job: Job) {
    return this.http.post<Job>(this.base, job);
  }

  updateJob(id: number, payload: Partial<Job>) {
    return this.http.patch<Job>(`${this.base}/${id}`, payload);
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
