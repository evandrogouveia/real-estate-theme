import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  posts$: Observable<Post[]>
  valueFilter: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.valueFilter = value;
    });

    this.posts$ = this.blogService.searchByCategory(
      this.valueFilter[0].charAt(0).toUpperCase() + this.valueFilter[0].substr(1).toLowerCase()
    )
  }

  getValueMessage(value){//recebe valor da busca do aside lateral através do EventEmitter
    if(value){
      this.posts$ = this.blogService.searchByCategory(
        value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
      )
    }
  }

}
