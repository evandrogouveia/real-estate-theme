import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modules/private/admin/components/blog/models/category.model';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-aside-lateral',
  templateUrl: './aside-lateral.component.html',
  styleUrls: ['./aside-lateral.component.scss']
})
export class AsideLateralComponent implements OnInit {
  categories$: Observable<Category[]>;
  posts$: Observable<Post[]>

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.categories$ = this.blogService.getCategory();
    this.posts$ = this.blogService.getPosts();
  }

}
