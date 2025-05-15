import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  User as FirebaseUser,
  UserCredential,
} from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { Observable } from 'rxjs';
import { User } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.currentUser = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');

    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

  async register(
    email: string,
    password: string,
    userData: Partial<User>
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        role: 'customer',
        address: userData.address,
        orders: [],
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(
    userId: string,
    userData: Partial<User>
  ): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
  }
}
