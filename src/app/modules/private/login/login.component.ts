import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

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

  submitLogin() {
    this.loading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.login(email, password)
      .subscribe(
        (u) => {
          this.afAuth.user.subscribe(data => {
            if (data) {
              if (data.email === 'vando_gouveia@hotmail.com') {
                this.router.navigateByUrl('/private/admin');
              } else {
                this.router.navigateByUrl('/private/login');
              }
              this.loading = false;
            }
          });
          
        },
        (err) => {
          this.loginErrorNotification(err);
          this.loading = false;
        }
      );
    
  }

  private loginErrorNotification(err) {
    this.msgErro = err;
  }

}
