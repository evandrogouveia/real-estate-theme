import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { User } from '../../../login/model/user.model';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }

  openModalAddUser(){
    this.bsModalRef = this.modalService.show(
      AddUserComponent,
      Object.assign({}, {class: 'modal-add-user'})
      );
  }

  searchUser(event){
    let e = event.target.value;
    if(e){
      this.users$ = this.userService.searchByName(
        e.charAt(0).toUpperCase() + e.substr(1).toLowerCase() //permitir pesquisa com letras maiúsculas ou minúsculas
      );
    }else{
      this.users$ = this.userService.getUsers();
    }
  }

}
