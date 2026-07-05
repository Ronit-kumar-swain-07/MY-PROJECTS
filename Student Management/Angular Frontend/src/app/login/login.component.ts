import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Login } from '../models/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: Login = {
    username: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login(): void {

    this.loginService.login(this.loginData).subscribe({

      next: (response) => {

        if (response === 'Login Successful') {

          sessionStorage.setItem('loggedIn', 'true');

          this.snackBar.open(
            'Login Successful',
            'Close',
            {
              duration: 3000
            }
          );

          this.router.navigate(['/dashboard']);

        } else {

          this.snackBar.open(
            'Invalid Username or Password',
            'Close',
            {
              duration: 3000
            }
          );

        }

      },

      error: () => {

        this.snackBar.open(
          'Login Failed',
          'Close',
          {
            duration: 3000
          }
        );

      }

    });

  }

}