import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private blogService: BlogService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categories$ = this.blogService.getCategory();
    this.posts$ = this.blogService.getPosts();
  }

  reload(link){
    this.router.navigateByUrl(`/blog/single-blog/${link}`).then(()=> {
      location.reload()
    });
  }

}
