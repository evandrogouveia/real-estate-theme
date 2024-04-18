import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../../../../login/model/user.model';
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
      typeModal: 'aviso',
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
    
  }

}
