import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable,of,throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<User>
  userData: any;
  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth
    ) { 
    }



  // CADASTRAR USUÁRIO ADMIN
  cadastro(user: User): Observable<boolean> {
    return from(this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc(u.user.uid)
          .set({ ...user, id: u.user.uid })
          .then(() => true)
        ),
        catchError((err) => throwError(err))
      );
  }

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

    // OBTER USUÁRIO
    getUser(): Observable<any> {
      return this.afAuth.authState
        .pipe(
          switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
        );
    }
    
    // SAIR
    logout() {
      this.afAuth.signOut();
      this.router.navigateByUrl('/private/login');
    }
}
