import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  categories$: Observable<Category[]>
  posts$: Observable<Post[]>

  @Output() eventEmmit = new EventEmitter<Observable<any>>(true);
  @Output() valueToEmit = new EventEmitter<boolean>();

  @ViewChild('search') search: ElementRef;

  constructor(
    private blogService: BlogService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categories$ = this.blogService.getCategory();
    this.posts$ = this.blogService.getPosts();
  }

  reload(event, id){// atualiza o post emitindo evento para single-blog
    this.router.navigateByUrl(`/blog/single-blog/${id}`);
    this.eventEmmit.emit(event);
  }

  searchBlog(term){
    if(term && (this.search.nativeElement.value.length > 0)){
      this.valueToEmit.emit(term);
      this.router.navigate(['blog/search-result'], {queryParams: [term]});
    }
    this.search.nativeElement.value = '';
  }

  filterCategory(c){
    if(c){
      this.valueToEmit.emit(c);
      this.router.navigate(['blog/category-page'], {queryParams: [c]})
    }
  }

}
