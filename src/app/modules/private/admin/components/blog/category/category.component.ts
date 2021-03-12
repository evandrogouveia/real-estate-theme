import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<Category[]>;

  addCategoryForm: FormGroup = this.fb.group({
    id: [undefined],
    name: [''],
    description: [''],
    parentCategory: ['']
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();
    this.categories$.subscribe(c => console.log(c))
  }

  addCategory(){
    let category: Category = this.addCategoryForm.value;
    if (!category.id) {
      this.submit(category);
      this.addCategoryForm.reset();
    } else {
      //this.updateServico(a);
    }
  }

  submit(c: Category){
    this.categoryService.addCategory(c)
  }

  delete(c: Category){
    this.categoryService.deleteCategory(c);
  }

}
