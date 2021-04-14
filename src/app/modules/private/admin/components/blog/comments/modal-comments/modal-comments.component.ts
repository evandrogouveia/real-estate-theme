import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-comments',
  templateUrl: './modal-comments.component.html',
  styleUrls: ['./modal-comments.component.scss']
})
export class ModalCommentsComponent implements OnInit {
  @Input() valueForm: any;
  currentDate = new Date();
  
  updateCommentsForm: FormGroup = this.fb.group({
    id: [undefined],
    comment: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    commentDate: [''],
    status: ['']
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private afs:AngularFirestore,
    ) { }

  ngOnInit(): void {
    if(this.valueForm){
      this.updateCommentsForm.patchValue(this.valueForm)
    }
  }

  updateComment(){
    if(this.valueForm){
      this.bsModalRef.content.callback(this.updateCommentsForm.value);//emite um evento callback true para o modal
    }else{
        this.updateCommentsForm.value.id = this.afs.createId(),
        this.updateCommentsForm.value.comment,
        this.updateCommentsForm.value.name,
        this.updateCommentsForm.value.email,
        this.updateCommentsForm.value.commentDate = this.currentDate,
        this.updateCommentsForm.value.status = 'Reject'

        this.bsModalRef.content.callback(this.updateCommentsForm.value);
    }
    
    this.bsModalRef.hide();
  }

}
