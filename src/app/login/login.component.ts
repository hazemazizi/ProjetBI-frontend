import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      if (this.username === 'superadmin') {
        this.router.navigate(['/super-admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      alert('Invalid credentials');
    }
  }
}