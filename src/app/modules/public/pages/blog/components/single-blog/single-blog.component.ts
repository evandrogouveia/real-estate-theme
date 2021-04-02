import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  addCommentsForm: FormGroup = this.fb.group({
    id: [undefined],
    comment: [''],
    name: [''],
    email: [''],
  });

  addPostForm: FormGroup = this.fb.group({
    comments: ['']
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private blogService: BlogService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.getPostDetail(postId).valueChanges();

    this.post$.subscribe(data => {
      this.addPostForm.patchValue(data)
    })
    this.url = window.location.href;
  }

  submit(){
    let post: Post = this.addPostForm.value;

    this.comment.push(
      this.addCommentsForm.value.id,
      this.addCommentsForm.value.comment,
      this.addCommentsForm.value.name,
      this.addCommentsForm.value.email,
    );
    this.addPostForm.value.comments = this.comment;
    console.log(this.comment)
    this.blogService.addComments(post)
  }

}
