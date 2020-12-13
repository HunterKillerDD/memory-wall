import { Injectable } from '@angular/core';
import { FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth) { }

  async signIn(email: string, password: string): Promise<any> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }
  async signUp(email: string, password: string): Promise<any> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }
  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}

