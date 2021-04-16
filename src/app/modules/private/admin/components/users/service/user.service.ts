import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import firebase from 'firebase/app';
import { catchError, switchMap, first, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/modules/private/login/service/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private loginService: LoginService,
    private router: Router
    ) {
     }

  private secondaryApp = firebase.initializeApp(environment.firebaseConfig, "SecondaryApp"); 

  addUser(user: User): Observable<boolean>{
    
    return from(this.secondaryApp.auth().createUserWithEmailAndPassword(user.email, user.password))
        .pipe(
          switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc(u.user.uid)
            .set({...user, id: u.user.uid})
            .then(() => true)
        ),
        catchError((err) => throwError(err))
        )
  }  

  // GET USER
  getUser(): Observable<User> {
    return this.afAuth.authState.pipe(
      switchMap(u => (u) ? this.userCollection.doc<User>(u.uid).valueChanges() : of(null))
    );
  } 
  
  // GET USERS
  getUsers() {
    return this.userCollection.valueChanges();
  } 

  // GET USER DETAIL
  getUserDetail(userId: string): AngularFirestoreDocument<User> {
    return this.afs.collection('users').doc(userId);
  }

  //DELETE USER
  deleteUser(u: User){
    return this.userCollection.doc(u.id).delete();
  }

  isLoggedIn(){
    return this.afAuth.authState.pipe(first())
  }

  searchByName(name: string): Observable<User[]>{
    return this.afs.collection<User>('users',
    ref => ref.orderBy('username').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }

  
}
