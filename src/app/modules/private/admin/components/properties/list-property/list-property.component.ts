import { Component, OnInit } from '@angular/core';
import { map } from 'leaflet';
import { BsModalRef, BsModalService, PageChangedEvent } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Propriedades } from '../models/propriedades.model';
import { PropriedadesService } from '../services/propriedades.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {

  dataInput: string;
  contentArray: any = [];
  returnedArray: any = [];
  itemsPerPage= 8;

  constructor(
    private propriedadesService: PropriedadesService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getPropriedades();
  }

  getPropriedades() {
     this.propriedadesService.getAllPropriedades().subscribe((value: any) => {
        this.contentArray = value;
        this.returnedArray = this.contentArray.slice(0,8);
     });
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 200);
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  duplicateItem(p) {
    const formData = new FormData();
    formData.append('formPropriedades', JSON.stringify(p));
    this.propriedadesService.newPropriedade(formData).subscribe(() => {
      this.toastr.success('Propriedade duplicada com sucesso', '');
      this.getPropriedades();
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao duplicar a Propriedade, tente novamente mais tarde', '');
    });
  }

  openModalConfirmDelete(p){
    const initialState = {
      titleModal: 'Deseja realmente excluir este Imóvel?',
      titlePost: p.titulo,
      callback: (result) => {//recebe o evento callback true do modal
        if (result === true){
          this.delete(p);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(p: Propriedades){
    this.propriedadesService.deletePropriedade(p.ID).subscribe(() => {
      this.getPropriedades();
      this.toastr.success('Propriedade removida com sucesso', '');
    });
  }

}
