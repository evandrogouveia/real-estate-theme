import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  posts$: Observable<Post[]>

  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

}
