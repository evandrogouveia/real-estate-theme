import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() titleModal: string;
  @Input() titlePost: string;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  delete(){
    this.bsModalRef.content.callback(true);//emite um evento callback true para o modal
    this.bsModalRef.hide();
  }

}
