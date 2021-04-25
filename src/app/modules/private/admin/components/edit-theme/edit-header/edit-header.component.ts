import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Navbar } from './models/navbar.model';
import { Topbar } from './models/topbar.model';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {
  logoSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  topbarData$: Observable<Topbar[]>;
  topbarId:any = [];

  navbarData$: Observable<Navbar[]>;
  navbarId:any = [];

  addEditTopbarForm: FormGroup = this.fb.group({
    id: [undefined],
    email: [''],
    address: [''],
    facebook: [''],
    twitter: [''],
    telegram: [''],
    instagram: ['']
  });

  addEditNavbarForm: FormGroup = this.fb.group({
    id: [undefined],
    logo: [''],
    menu1: [''],
    menu2: [''],
    menu3: [''],
    menu4: [''],
    menu5: [''],
    phone: [''],
    linkwhatsapp: ['']
  });


  constructor(
    private fb: FormBuilder, 
    private headerService: HeaderService,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    ) { }

  ngOnInit(): void {
    this.topbarData$ = this.headerService.getTopbar();
    this.topbarData$.subscribe(topbar => {
      topbar.forEach(d => {
        const topbar = this.headerService.getTopbarDetail(d.id).valueChanges();
        topbar.subscribe(data => {
          this.addEditTopbarForm.patchValue(data);
        });
      });
    });

    this.navbarData$ = this.headerService.getNavbar();
    this.navbarData$.subscribe(navbar => {
      navbar.forEach(n => {
        const navbar = this.headerService.getNavbarDetail(n.id).valueChanges();
        navbar.subscribe(data => {
          this.addEditNavbarForm.patchValue(data);
          if(data.logo)
          this.logoSrc = data.logo
        });
      });
    });
  }

  showPreviewLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.logoSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.logoSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  submitTopbar(){
    let topbar:Topbar = this.addEditTopbarForm.value;
    
    if (!topbar.id && this.addEditTopbarForm.valid) {
      this.headerService.addTopbar(topbar);
      this.toastr.success('Dados inseridos com sucesso');
    }else{
      this.headerService.updateTopbar(topbar);
      this.toastr.success('Dados atualizados com sucesso');
    }
  
  }

  submitNavbar(){
    let navbar:Navbar = this.addEditNavbarForm.value;
     
    if (!navbar.id && this.addEditNavbarForm.valid) {
      this.headerService.addNavbar(navbar);
      this.toastr.success('Dados inseridos com sucesso');
    }else{
      if (this.selectedImage) {
        const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.addEditNavbarForm.value.logo = url;
              this.headerService.updateNavbar(navbar).then(() => {
                this.toastr.success('Dados atualizados com sucesso');
              });
            });
          })
        ).subscribe();
      } else {
        this.addEditNavbarForm.value.logo = this.logoSrc;
        this.headerService.updateNavbar(navbar).then(() => {
          this.toastr.success('Dados atualizados com sucesso');
        });
      }
    }
  }

}
