import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Topbar } from './models/topbar.model';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  topbarData$: Observable<Topbar[]>;
  topbarId:any = [];

  addEditTopbarForm: FormGroup = this.fb.group({
    id: [undefined],
    email: [''],
    address: [''],
    facebook: [''],
    twitter: [''],
    telegram: [''],
    instagram: ['']
  });


  constructor(
    private fb: FormBuilder, 
    private headerService: HeaderService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.topbarData$ = this.headerService.getTopbar();
    this.topbarData$.subscribe(topbar => {
      topbar.forEach(d => {
        const topbar = this.headerService.getTopbarDetail(d.id).valueChanges();
        topbar.subscribe(data => {
          this.addEditTopbarForm.patchValue(data);
        })
      })
    });

    
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

  addCategory(){
    
  }

  submitTopbar(){
    let topbar: Topbar = this.addEditTopbarForm.value;
    
    if (!topbar.id && this.addEditTopbarForm.valid) {
      this.headerService.addTopbar(topbar);
      this.toastr.success('Dados inseridos com sucesso');
    }else{
      this.headerService.updateTopbar(topbar);
      this.toastr.success('Dados atualizados com sucesso');
    }
  
  }

}
