import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    // If already logged in, go directly to dashboard
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

  }

  login(): void {

    this.errorMessage = '';

    if (!this.username || !this.password) {

      this.errorMessage = 'Please enter username and password';

      return;

    }

    this.loading = true;

    this.loginService.login(this.username, this.password)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          localStorage.setItem('user', JSON.stringify(res));

          this.toastr.success('Login Successful');

          this.router.navigateByUrl('/dashboard');

        },

        error: () => {

          this.loading = false;

          this.errorMessage = 'Invalid Username or Password';

          this.toastr.error('Invalid Username or Password');

        }

      });

  }

}