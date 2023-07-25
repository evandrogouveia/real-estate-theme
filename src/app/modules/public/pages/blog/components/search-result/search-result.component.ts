import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';
import { PostService } from 'src/app/modules/private/admin/components/blog/services/post.service';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  posts$: Observable<Post>
  valueFilter: any;

  constructor(
    private postsService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getPost();

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
      if (event) {  this.getPost(); }
    });
  }

  getPost() {
    this.route.queryParams.subscribe(value => {
      this.valueFilter = value;
      this.posts$ = this.postsService.getSearchPosts(this.valueFilter[0]);
    });
  }

  getValueMessage(value){//recebe valor da busca do aside lateral através do EventEmitter
    if(value){
      console.log(value)
      /*this.posts$ = this.blogService.searchByCategory(
        value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
      )*/
    }
  }

}
