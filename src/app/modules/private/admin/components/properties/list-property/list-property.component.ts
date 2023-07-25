import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
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
  properties$: Observable<Propriedades>
  dataInput: string;

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
    this.properties$ = this.propriedadesService.getAllPropriedades();
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

  getJsonFromObj(obj) {
    obj = JSON.parse(obj);
    if (obj.length !== 0) {
      return obj;
    } else {
      return 'Sem categoria'
    }
  }

  delete(p: Propriedades){
    this.propriedadesService.deletePropriedade(p.ID).subscribe(() => {
      this.getPropriedades();
      this.toastr.success('Propriedade removida com sucesso', '');
    });
  }

}
