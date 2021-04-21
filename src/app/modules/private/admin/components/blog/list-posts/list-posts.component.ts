import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts$: Observable<Post[]>
  dataInput: string;

  constructor(
    private postService: PostService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  openModalConfirmDelete(p){
    const initialState = {
      titleModal: 'Deseja realmente excluir o Post?',
      titlePost: p.titlePost,
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

  delete(p: Post){
    this.postService.deletePost(p);
  }

}
