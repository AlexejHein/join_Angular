import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  hideRequiredControl = new FormControl(false);
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      response => {
        console.log('User logged in successfully!', response);
        localStorage.setItem('token', response.access);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/summary']).then(r => {});
      },
      error => {
        this.errorMessage = 'There was an error during the login process!';
        console.error('There was an error during the login process!', error);
      }
    );
  }
}
