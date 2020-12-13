import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../core/storage.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { FirebaseService } from '../firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged = false;
  authState: any = null;

  constructor(private storage: StorageService,
              private afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }

  get isUserAnnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState[`email`];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  registerWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
      this.isLogged = true;
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

  loginWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
      this.isLogged = true;
    }).catch(error => {
      console.log(error);
      throw error;
    });
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/home']);
    this.isLogged = false;
  }




}
