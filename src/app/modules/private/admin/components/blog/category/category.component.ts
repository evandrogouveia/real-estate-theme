import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  categoryId: string;
  isAddMode: boolean;

  addCategoryForm: FormGroup = this.fb.group({
    id: [undefined],
    name: ['', Validators.required],
    description: [''],
    parentCategory: ['']
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategory();

    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.categoryId;

    if (!this.isAddMode) {
      const post: Observable<Category> = this.categoryService.getCategoryDetail(this.categoryId).valueChanges();
      post.subscribe(data => {
        this.addCategoryForm.patchValue(data);
      });
    }
  }

  addCategory(){
    let category: Category = this.addCategoryForm.value;
    if (!category.id && this.addCategoryForm.valid) {
      this.categoryService.addCategory(category);
      this.addCategoryForm.reset();
      this.toastr.success('Categoria adicionada com sucesso');
    }
  }
  updateCategory(){
    let category: Category = this.addCategoryForm.value;
    this.categoryService.updateCategory(category);
    this.addCategoryForm.reset();
    this.router.navigateByUrl('/private/admin/add-category');
    this.toastr.success('Categoria atualizada com sucesso');
  }

  submit(){
    if (this.isAddMode) {
      this.addCategory();
    } else {
      this.updateCategory();
    }
  }

  delete(c: Category){
    this.categoryService.deleteCategory(c);
  }

  searchCategory(event){
    let e = event.target.value;
    if(e){
      this.categories$ = this.categoryService.searchByName(
        e.charAt(0).toUpperCase() + e.substr(1).toLowerCase() //permitir pesquisa com letras maiúsculas ou minúsculas
      );
    }else{
      this.categories$ = this.categoryService.getCategory();
    }
  }

}
