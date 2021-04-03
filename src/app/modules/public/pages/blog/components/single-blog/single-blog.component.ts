import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    name: ['', Validators.required],
    email: ['', Validators.required],
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
    private afs:AngularFirestore
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.getPostDetail(postId).valueChanges();

    this.post$.subscribe(data => {
      this.updatePostForm.patchValue(data)
    })
    this.url = window.location.href;
  }

  submit() {
    let post: Post = this.updatePostForm.value;
    if (this.addCommentsForm.valid) {
      this.comment.push(
        this.addCommentsForm.value.id = this.afs.createId(),
        this.addCommentsForm.value.comment,
        this.addCommentsForm.value.name,
        this.addCommentsForm.value.email,
      );
      this.updatePostForm.value.comments.push(this.addCommentsForm.value);

      this.blogService.addComments(post);
      this.addCommentsForm.reset();
    }

  }

}
