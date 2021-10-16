import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss']
})
export class ListPropertyComponent implements OnInit {
  properties$: Observable<Property[]>
  dataInput: string;

  constructor(
    private propertyService: PropertyService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    this.properties$ = this.propertyService.getProperties();
  }

  openModalConfirmDelete(p){
    const initialState = {
      titleModal: 'Deseja realmente excluir este Imóvel?',
      titlePost: p.titleProperty,
      callback: (result) => {//recebe o evento callback true do modal
        if (result == true){
          this.delete(p);
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );

  }

  delete(p: Property){
    this.propertyService.deleteProperty(p);
  }

}
