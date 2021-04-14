import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/private/login/model/user.model';
import { UserService } from '../../../users/service/user.service';

@Component({
  selector: 'app-modal-comments',
  templateUrl: './modal-comments.component.html',
  styleUrls: ['./modal-comments.component.scss']
})
export class ModalCommentsComponent implements OnInit {
  @Input() valueForm: any;
  currentDate = new Date();
  user$: Observable<User>

  name: string;
  email: string;

  updateCommentsForm: FormGroup = this.fb.group({
    id: [undefined],
    comment: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    commentDate: [],
    status: ['']
  });

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private afs:AngularFirestore,
    private userService: UserService
    ) { 
      this.userService.getUser().subscribe(d => {
        this.name = d.name;
        this.email = d.email;
      })
    }

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
      this.updateCommentsForm.value.name = this.name,
      this.updateCommentsForm.value.email = this.email,
      this.updateCommentsForm.value.commentDate = this.currentDate,
      this.updateCommentsForm.value.status = 'Approved'
   
      this.bsModalRef.content.callback(this.updateCommentsForm.value);
    }
    
    this.bsModalRef.hide();
  }

}
