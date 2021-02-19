import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  imagemSrc = 'assets/img/icons/user-empty.svg';
  selectedImage: any = null;
  currentUser$: Observable<User>;

  show = false;
  type = 'password';

  functions: any = ['administrador', 'usuário'];

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    const userId: string = this.route.snapshot.paramMap.get('id');
    this.currentUser$ = this.userService.getUserDetail(userId).valueChanges();

    this.currentUser$.subscribe(data => {
      this.updateProfileForm.setValue(data);
      data.avatar ? this.imagemSrc = data.avatar : this.imagemSrc = this.imagemSrc;
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

  showHidPassword() {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
