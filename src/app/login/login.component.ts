import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
  hideRequiredControl = new FormControl(false);
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    console.log(credentials);

    this.authService.login(credentials).subscribe(
      response => {
        console.log('User logged in successfully!', response);
        localStorage.setItem('token', response.access);
        this.router.navigate(['/summary']).then(r => {});
      },
      error => {
        console.error('There was an error during the login process!', error);
      }
    );
  }
}
