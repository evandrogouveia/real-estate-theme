import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {
  posts$: Observable<Post[]>

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

  delete(p: Post){
    this.postService.deletePost(p);
  }

}
