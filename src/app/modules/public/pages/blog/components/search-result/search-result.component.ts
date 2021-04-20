import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  posts$: Observable<Post[]>
  valueSearch: any;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.valueSearch = value;
    });

    this.posts$ = this.blogService.searchByName(
      this.valueSearch[0].charAt(0).toUpperCase() + this.valueSearch[0].substr(1).toLowerCase()
    )

  }

  getValueMessage(value){//recebe valor da busca do aside lateral através do EventEmitter
    if(value){
      this.posts$ = this.blogService.searchByName(
        value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
      )
    }
  }

}
