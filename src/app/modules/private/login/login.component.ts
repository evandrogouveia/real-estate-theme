import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

import { firebase } from '@firebase/app';
import '@firebase/auth';
import { User } from './model/user.model';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  show = false;
  type = 'password';
 
  loading = false;
  msgErro = '';

  remember = false;

  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  showHidPassword() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  isChecked(event){
    this.remember =  event.target.checked;
  }

  submitLogin() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = CryptoJS.SHA256(this.loginForm.value.password).toString();

    this.loginService.login(email, password)
      .subscribe(
        (u) => {
          this.afAuth.user.subscribe(data => {
            if (data) {
              this.router.navigateByUrl('/private/admin');
              this.loading = false;
            }else {
              this.router.navigateByUrl('/private/login');
            }
          });
          
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;
        }
      );

      //FICAR CONECTADO
      this.afAuth.setPersistence(
        this.remember === true ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION
      );
  }

  private loginErrorNotification(err) {
    this.msgErro = err;
  }

  cadastroUsuario() {
    const newUser: User = {
      username: 'Admin',
      name: 'Administrador',
      lastname: '',
      email: 'vando_gouveia@hotmail.com',
      password: CryptoJS.SHA256('123456').toString(),
      function: 'admin'
    };

    this.loginService.cadastro(newUser)
      .subscribe(
        (u) => {
          console.log('cadastrou');
        },
        (err) => {
         console.log(err);
        }
      );
  }

}
