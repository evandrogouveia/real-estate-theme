import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../../../login/model/user.model';
import { ModalComponent } from '../shared/modal/modal.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  dataInput: string;

  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastr: ToastrService
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

  openModalConfirmDelete(u){
    const initialState = {
      titleModal: 'Deseja realmente excluir o usuário?',
      titlePost: u.username,
      callback: (result) => {//recebe o evento callback true do modal
        if (result == true){
          this.deleteUser(u);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  deleteUser(u: User){
    this.userService.deleteUser(u).then(() => {
      this.toastr.success('Usuário removido com sucesso')
    });
  }

  searchUser(event){
    this.dataInput = event.target.value;
    if(this.dataInput){
      this.users$ = this.userService.searchByName(
        this.dataInput.charAt(0).toUpperCase() + this.dataInput.substr(1).toLowerCase() //permitir pesquisa com letras maiúsculas ou minúsculas
      );
    }else{
      this.users$ = this.userService.getUsers();
    }
  }

}
