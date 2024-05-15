import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private authService: AuthService) { }

  register() {
    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    this.authService.register(user).subscribe(
      response => {
        console.log('User registered successfully!', response);
      },
      error => {
        console.error('There was an error during the registration process!', error);
      }
    );
  }
}
