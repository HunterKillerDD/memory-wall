import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../form-err.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string} = { name: '', message: '' };

  constructor(private userService: UserService,
              private router: Router) {
              }

  ngOnInit(): void {
  }

  login(): void {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.userService.loginWithEmail(this.email, this.password).then(() => {
        this.router.navigate(['/home']);
      }).catch(error => {
        this.error = error;
      });
    }
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  validateForm(email, password): boolean {
    if (email.lenght === 0) {
      this.errorMessage = 'Email is required!';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'Passowrd is required!';
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = 'Password must be longer than 6 characters';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

}
