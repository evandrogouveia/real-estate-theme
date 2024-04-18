import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/modules/login/model/user.model';
import { UserService } from '../service/user.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  imagemSrc = 'assets/img/icons/user-empty.svg';
  selectedImage: any = null;
  currentUser$: Observable<User>;

  show1 = false;
  show2 = false;

  functions: any = ['Administrador', 'Usuário'];

  updateProfileForm: FormGroup = this.fb.group({
    'id': [''],
    'avatar': [''],
    'username': ['', [Validators.required]],
    'name': ['', [Validators.required]],
    'lastname': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'function': [''],
    'password': [''],
  });

  updatePasswordForm: FormGroup = this.fb.group({
    'currentpassword': [''],
    'newpassword': [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    const userId: string = this.route.snapshot.paramMap.get('id');
   

    this.currentUser$.subscribe(data => {
      this.updateProfileForm.setValue(data);
      data.foto ? this.imagemSrc = data.foto : this.imagemSrc = this.imagemSrc;
    })
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imagemSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  updateUser(){
    let user = this.updateProfileForm.value;

    if(this.selectedImage){
    }
  }

  updatePassword(){
   
  }

}
