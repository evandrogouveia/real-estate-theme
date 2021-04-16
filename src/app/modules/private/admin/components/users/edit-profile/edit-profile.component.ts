import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private storage: AngularFireStorage,
    private toastr: ToastrService
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

  updateUser(){
    let user = this.updateProfileForm.value;

    if(this.selectedImage){
      const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateProfileForm.value.avatar = url;
            this.updateProfileForm.value.username;
            this.updateProfileForm.value.name;
            this.updateProfileForm.value.lastname;
            this.updateProfileForm.value.email;
            this.updateProfileForm.value.function;
            this.updateProfileForm.value.password;
            this.userService.updateUser(user).subscribe(() => {
              this.toastr.success('Perfil atualizado com sucesso');
            });
           
          });
        })
      ).subscribe();
    }else{
          this.updateProfileForm.value.avatar
          this.updateProfileForm.value.username;
          this.updateProfileForm.value.name;
          this.updateProfileForm.value.lastname;
          this.updateProfileForm.value.email;
          this.updateProfileForm.value.function;
          this.updateProfileForm.value.password;
          this.userService.updateUser(user).subscribe(() => {
            this.toastr.success('Perfil atualizado com sucesso');
          });
    }
  }

}
