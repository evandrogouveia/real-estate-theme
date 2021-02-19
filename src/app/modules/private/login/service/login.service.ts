import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable,throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<User>
  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth
    ) { }

    //LOGIN E-MAIL E SENHA
    login(email: string, password: string): Observable <User> {
      return from(this.afAuth.signInWithEmailAndPassword(email, password))
        .pipe(
          switchMap((u: firebase.auth.UserCredential) => {
            return this.userCollection.doc<User>(u.user.uid).valueChanges();
          }),
          catchError(() => {
            return throwError('Usuário ou senha inválidos :(');
          })
        );
    }

    // AUTENTICAÇÃO DO USUÁRIO
    authenticated(): Observable<boolean>{
      return this.afAuth.authState
        .pipe(map(u => (u) ? true : false));
    }
    
    // SAIR
    logout() {
      this.afAuth.signOut();
      this.router.navigateByUrl('/private/login');
    }
}
