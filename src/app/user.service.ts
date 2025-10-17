import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationItem, User } from './model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 base = 'https://jobfile.onrender.com/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.base);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  patchUser(id: number, payload: Partial<User>) {
    return this.http.patch<User>(`${this.base}/${id}`, payload);
  }

  async pushNotificationToUser(userId: number, note: NotificationItem) {
    const user: any = await firstValueFrom(this.getUser(userId));
    const notifications = user.notifications || [];
    notifications.unshift(note);
    return firstValueFrom(this.patchUser(userId, { notifications }));
  }

  async pushNotificationToAllCandidates(note: NotificationItem) {
    const users: any[] = await firstValueFrom(this.getUsers());
    const candidates = users.filter(u => u.role === 'candidate');
    const promises = candidates.map(c => {
      const n = c.notifications || [];
      n.unshift(note);
      return firstValueFrom(this.patchUser(c.id, { notifications: n }));
    });
    return Promise.all(promises);
  }
}
