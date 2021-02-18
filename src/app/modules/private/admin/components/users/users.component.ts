import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  openModalAddUser(){
    this.bsModalRef = this.modalService.show(
      AddUserComponent,
      Object.assign({}, {class: 'modal-add-user'})
      );
  }

}
