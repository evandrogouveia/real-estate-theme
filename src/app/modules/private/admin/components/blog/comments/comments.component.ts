import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/modules/public/pages/blog/services/blog.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalCommentsComponent } from './modal-comments/modal-comments.component';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @ViewChildren('inputStatus') inputStatus: QueryList<ElementRef>

  posts$: Observable<Post[]>
  statusComment;
  currentDate = new Date();
  comment: any = [];

  updateCommentsForm: FormGroup = this.fb.group({
    id: [undefined],
    comment: [''],
    name: [''],
    email: [''],
    commentDate: [''],
    status: ['']
  });

  updatePostForm: FormGroup = this.fb.group({
    id: [undefined],
    titlePost: [''],
    descriptionPost: [''],
    highlightedImage: [''],
    categories: [''],
    publicationDate: [''],
    author: [''],
    comments: ['']
  });

  constructor(
    private postService: PostService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private afs:AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  toggleStatus(i, p: Post){
    let c: any = p.comments[i];
    this.updateCommentsForm.patchValue(c);
    
    this.updatePostForm.patchValue(p);

    let post: Post = this.updatePostForm.value;
   
    if (this.updateCommentsForm.value.status === 'Reject') {
        this.updateCommentsForm.value.status = 'Approved';
        this.updatePostForm.value.comments[i] = this.updateCommentsForm.value;
        this.blogService.updateComments(post).then(() => {
          this.toastr.success('Comentário aprovado');
        })
    }else{
        this.updateCommentsForm.value.status = 'Reject';
        this.updatePostForm.value.comments[i] = this.updateCommentsForm.value;
        this.blogService.updateComments(post).then(() => {
          this.toastr.warning('Comentário rejeitado');
        })
    }
  }

  openModalEdit(i, p){
    let c: any = p.comments[i];
    this.updatePostForm.patchValue(p);

    let post: Post = this.updatePostForm.value;

    const initialState = {
      titleModal: 'Editar comentário',
      valueForm: c,
      callback: (formData) => {//recebe o evento callback com dados do form do modal
        if (formData){
          console.log(formData)
          this.updatePostForm.value.comments[i] = formData;
          this.blogService.updateComments(post).then(() => {
            this.toastr.success('Comentário atualizado com sucesso');
          });
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalCommentsComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );
  }

  openModalResponse(i, p){
    this.updatePostForm.patchValue(p);

    let post: Post = this.updatePostForm.value;

    const initialState = {
      titleModal: 'Editar comentário',
      callback: (formData) => {//recebe o evento callback com dados do form do modal
        if (formData){
         
          
          setTimeout(() => {
            this.updatePostForm.value.comments.push(formData);
            this.blogService.addComments(post).then(() => {
              this.toastr.success('Resposta enviada com sucesso');
            });
          }, 1500)
          
        }
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalCommentsComponent,
      Object.assign({initialState}, {class: 'modal-all'}),
    );
  }

  deleteComment(i, p: any){
       p.comments.splice(i, 1);
    
      this.updatePostForm.patchValue(p);

      this.updatePostForm.value.comments = p.comments;

      let post: Post = this.updatePostForm.value;
      this.blogService.updateComments(post).then(() => {
        this.toastr.success('Comentário removido');
      })
  }

}
