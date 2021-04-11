import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/modules/public/pages/blog/services/blog.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  posts$: Observable<Post[]>
  statusComment;
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
        this.blogService.updateComments(post);
    }else{
        this.updateCommentsForm.value.status = 'Reject';
        this.updatePostForm.value.comments[i] = this.updateCommentsForm.value;
        this.blogService.updateComments(post);
    }
  }

  deleteComment(i, p: any){
       p.comments.splice(i, 1);
    
      this.updatePostForm.patchValue(p);

      this.updatePostForm.value.comments = p.comments;

      let post: Post = this.updatePostForm.value;
      this.blogService.updateComments(post);
  }

}
