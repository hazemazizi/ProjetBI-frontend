import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  private mockUsers: { [username: string]: { password: string; role: string } } = {
    'executive': { password: 'pass123', role: 'Executive' },
    'departmenthead': { password: 'pass123', role: 'DepartmentHead' },
    'finance': { password: 'pass123', role: 'FinanceInsurance' },
    'quality': { password: 'pass123', role: 'QualityPatientServices' },
  };

  constructor() { }

  login(username: string, password: string): boolean {
    const user = this.mockUsers[username];
    if (user && user.password === password) {
      localStorage.setItem('userRole', user.role);
      this.userRoleSubject.next(user.role);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(null);
  }
}