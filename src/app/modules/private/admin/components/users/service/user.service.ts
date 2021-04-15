import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    ) { }

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

  searchByName(name: string): Observable<User[]>{
    return this.afs.collection<User>('users',
    ref => ref.orderBy('username').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }

  
}
