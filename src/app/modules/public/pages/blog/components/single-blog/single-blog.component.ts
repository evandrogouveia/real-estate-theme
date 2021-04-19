import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  
  post$: Observable<Post>
  url: any;
  comment: any = [];
  currentDate = new Date();
  approvedComments: any;
  sendMessage: boolean = false;
  loading:boolean = false;
  submitted: boolean = false;
  scrollPosition;
 

  addCommentsForm: FormGroup = this.fb.group({
    id: [undefined],
    comment: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
    private route: ActivatedRoute,
    private postService: PostService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private afs:AngularFirestore,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.getPostDetail(postId).valueChanges();
    
    this.post$.subscribe(data => {
      this.updatePostForm.patchValue(data)
      let c:any = data.comments;
      this.approvedComments = c.filter(d => d.status == 'Approved');
    });

    this.url = window.location.href;
  }

  submit() {
    this.loading = true;
    this.submitted = true;
    let post: Post = this.updatePostForm.value;
    if (this.addCommentsForm.valid) {
      this.submitted = false;
      this.comment.push(
        this.addCommentsForm.value.id = this.afs.createId(),
        this.addCommentsForm.value.comment,
        this.addCommentsForm.value.name,
        this.addCommentsForm.value.email,
        this.addCommentsForm.value.commentDate = this.currentDate,
        this.addCommentsForm.value.status = 'Reject'
      );
      this.updatePostForm.value.comments.push(this.addCommentsForm.value);
      this.blogService.addComments(post).then(() =>{
        setTimeout(() =>{
          const b = document.querySelector("#message");
          b.scrollIntoView({behavior: 'smooth', block: 'center'})
        }, 100);
        this.sendMessage = true;
        this.loading = false;
      });
      this.addCommentsForm.reset();
    }else{
      this.loading = false;
    }

  }

  reloadPost(): Observable<Post>{//recebe evento pelo aside lateral para atualização do post
    const postId = this.route.snapshot.paramMap.get('id');
    return this.post$ = this.postService.getPostDetail(postId).valueChanges();
  }

}
