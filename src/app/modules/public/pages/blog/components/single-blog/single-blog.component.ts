import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {
  post = [];
  url: any;
  currentDate = new Date();
  scrollPosition;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postsService.getPostID(postId).subscribe((post: any) => {
      post.map(p => p.categorias = JSON.parse(p.categorias));
      this.post = post;
      console.log(post)
    })
    this.url = window.location.href;
  }

}
