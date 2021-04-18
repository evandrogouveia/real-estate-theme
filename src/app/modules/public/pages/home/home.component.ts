import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { BlogService } from '../blog/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]>

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.posts$ = this.blogService.getPosts();
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: false,
    autoWidth: true,
    navText: ['<i class="bx bxs-chevron-left"></i>', '<i class="bx bxs-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
