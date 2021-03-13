import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/modules/private/admin/components/blog/models/category.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-aside-lateral',
  templateUrl: './aside-lateral.component.html',
  styleUrls: ['./aside-lateral.component.scss']
})
export class AsideLateralComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.categories$ = this.blogService.getCategory();
  }

}
