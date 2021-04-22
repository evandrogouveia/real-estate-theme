import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  posts$: Observable<Post[]>;
  valueSearch: any;
  term: Observable<any>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      this.valueSearch = value;
      this.term = this.valueSearch[0];
    });
    this.posts$ = this.blogService.getPosts();
  }

  getValueMessage(value){//recebe valor da busca do aside lateral através do EventEmitter
    if(value){
      this.term = value;
    }
  }

}
