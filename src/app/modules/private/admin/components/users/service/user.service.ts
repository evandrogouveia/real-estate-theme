import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import firebase from 'firebase/app';

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

  // GET USER DETAIL
  getUserDetail(userId: string): AngularFirestoreDocument<User> {
    return this.afs.collection('users').doc(userId);
  }

  
}
