import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/modules/login/model/user.model';

import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  alertCtrl:any = Object;

  constructor(
  
    ) {}

 

  addUser(user: User): Observable<boolean>{
    return;
  }  

  // GET USER
  getUser(): Observable<User> {
    return;
  } 
  
  // GET USERS ALL
  getUsers() {
    return;
  } 

  // GET USER DETAIL
  getUserDetail(userId: string): Observable<User> {
    return;
  }

  //UPDATE USER
  updateUser(u: User){
    return;
  }

  //DELETE USER
  deleteUser(u: User){
    return;
  }

  //DELETE E-MAIL USER
  deleteEmailUser(user: any, path: string){
    return;
  }

  searchByName(name: string): Observable<User[]>{
    return;
  }

  changePassword(pass){
    return;
  
  }
  
}
