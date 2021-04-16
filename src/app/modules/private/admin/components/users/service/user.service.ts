import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import firebase from 'firebase/app';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User> = this.afs.collection('users');
  alertCtrl:any = Object;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    ) {}

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
  
  // GET USERS ALL
  getUsers() {
    return this.userCollection.valueChanges();
  } 

  // GET USER DETAIL
  getUserDetail(userId: string): AngularFirestoreDocument<User> {
    return this.afs.collection('users').doc(userId);
  }

  //UPDATE USER
  updateUser(u: User){
    return from(this.userCollection.doc(u.id)
    .set({...u}).then(() => true));
  }

  //DELETE USER
  deleteUser(u: User){
    return this.userCollection.doc(u.id).delete().then(() => this.deleteEmailUser(u, null));
  }

  //DELETE E-MAIL USER
  deleteEmailUser(user: any, path: string){
    return this.userCollection.doc('users' + path).delete().then(() => {
      this.secondaryApp.auth().signInWithEmailAndPassword(user.email, user.password).then(() => {
        let user:any = this.secondaryApp.auth().currentUser;
        user.delete();
      })
    })
  }

  searchByName(name: string): Observable<User[]>{
    return this.afs.collection<User>('users',
    ref => ref.orderBy('username').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }

  changePassword(pass){
    const user = firebase.auth().currentUser;
    
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, pass.currentpassword);

    user.reauthenticateWithCredential(credentials).then(success => {
      user.updatePassword(pass.newpassword).then(() => console.log('sucesso'))
    })
  
  }

  
}
