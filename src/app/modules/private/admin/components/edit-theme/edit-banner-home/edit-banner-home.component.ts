import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-banner-home',
  templateUrl: './edit-banner-home.component.html',
  styleUrls: ['./edit-banner-home.component.scss']
})
export class EditBannerHomeComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  imagemSrcPaginas = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  selectedImagePaginas: any = null;

  isAddMode: boolean;

  banners$: Observable<any>;

  addBannerHomeForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
    titulo: [''],
    descricao: [''],
    link: ['']
  });

  addBannerPaginasForm: FormGroup = this.fb.group({
    ID: [],
    imagem: [''],
  });

  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.getBanners();
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imagemSrc = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  showPreviewImagePaginas(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrcPaginas = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImagePaginas = event.target.files[0];
    } else {
      this.imagemSrcPaginas = 'assets/img/placeholder.jpg';
      this.selectedImagePaginas = null;
    }
  }

  getBanners() {
    this.banners$ = this.editThemeService.getAllBanners();
    this.editThemeService.getAllBannerPaginas().subscribe(banner => {
      if (banner[0]?.ID) {
        this.imagemSrcPaginas = banner[0]?.imagem;
        this.addBannerPaginasForm.patchValue(banner[0]);
        console.log(this.addBannerPaginasForm.controls.ID.value)
      }
    });

    
  }

  addUpdadeBannerHome() {
    const ID = this.addBannerHomeForm.controls.ID.value;
    const formData = new FormData();

    formData.append('imagem', this.selectedImage);
    formData.append('formBanners', JSON.stringify(this.addBannerHomeForm.value));

    if (ID) {
      this.editThemeService.updateBanner(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.reset();
        this.getBanners();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newBanner(formData).subscribe(() => {
        this.reset();
        this.getBanners();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

  reset() {
    window.scroll(0, 650);
    this.addBannerHomeForm.reset();
    this.imagemSrc = 'assets/img/placeholder.jpg';
    this.selectedImage = null;
  }

  setDataBanners(b): void{
    this.isAddMode = false;
    window.scroll(0, 0);
    this.addBannerHomeForm.patchValue(b);
  }

  openModalConfirmDelete(b){
    const initialState = {
      titleModal: 'Deseja realmente excluir esta banner?',
      titlePost: b.titulo,
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(b);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(b: any){
    this.editThemeService.deleteBanner(b.ID).subscribe(() => {
      this.getBanners();
      this.toastr.success('Banner removido com sucesso', '');
    });
  }

  addUpdadeBannerPaginas() {
    const ID = this.addBannerPaginasForm.controls.ID.value;
    const formData = new FormData();
    console.log(ID)
    if(this.selectedImagePaginas){
      formData.append('imagemPaginas', this.selectedImagePaginas);
    }
    formData.append('formBannerPaginas', JSON.stringify(this.addBannerPaginasForm.value));

    if (ID) {
      console.log(this.addBannerPaginasForm.value)
      this.editThemeService.updateBannerPaginas(ID, formData).subscribe(() => {
        this.isAddMode = true;
        this.getBanners();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newBannerPaginas(formData).subscribe(() => {
        this.getBanners();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao cadastrar dados, tente novamente mais tarde', '');
      });
    }
  }

}
