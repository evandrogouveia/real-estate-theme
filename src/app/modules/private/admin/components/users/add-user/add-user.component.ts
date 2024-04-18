import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/modules/login/model/user.model';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  show = false;
  type = 'password';
  loading:boolean = false;

  addUserForm: FormGroup = this.fb.group({
    avatar: [''],
    email: ['', [Validators.required]],
    function: ['', [Validators.required]],
    username: ['', [Validators.required]],
    name: [''],
    lastname: [''],
    password: ['', [Validators.required]],
  });
  
  constructor(
    public bsModalRef: BsModalRef, 
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
  }

  showHidPassword() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  addUser(){
    this.loading = true;

    let secretPassword = CryptoJS.SHA256(this.addUserForm.value.password).toString();
    let username = this.addUserForm.value.username.charAt(0).toUpperCase() + this.addUserForm.value.username.slice(1)
    let name = this.addUserForm.value.name.charAt(0).toUpperCase() + this.addUserForm.value.name.slice(1)
    
    this.addUserForm.value.password = secretPassword;
    this.addUserForm.value.username = username;
    this.addUserForm.value.name = name;

    const user: User = this.addUserForm.value;
    
    this.userService.addUser(user).subscribe(
      (u) => {
        this.bsModalRef.hide();
        this.loading = false;
        this.toastr.success('Usuário adicionado com sucesso!')
      },
      (err) => {
        this.loading = false;
        if(err.code === 'auth/email-already-in-use'){
          this.toastr.error('Usuário já cadastrado!')
        }
      }
    )
  }

}
