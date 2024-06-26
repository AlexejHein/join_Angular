import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  hide: boolean = true;  // Default auf true setzen
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  register() {
    if (!this.passwordsMatch()) {
      console.error('Passwords do not match!');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      email: this.email
    };

    console.log('Registering user:', user); // Debugging-Ausgabe

    this.authService.register(user).subscribe(
      response => {
        console.log('User registered successfully!', response);
        this.router.navigate(['']).then(r => {});  // Weiterleitung zur Login-Seite
      },
      error => {
        console.error('There was an error during the registration process!', error);
        if (error.status === 400) {
          console.error('Validation errors:', error.error); // Detaillierte Fehlermeldung ausgeben
        }
      }
    );
  }
}
