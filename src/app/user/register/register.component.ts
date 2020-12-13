import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../form-err.css']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string} = { name: '', message: '' };

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.userService.registerWithEmail(this.email, this.password).then(() => {
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
