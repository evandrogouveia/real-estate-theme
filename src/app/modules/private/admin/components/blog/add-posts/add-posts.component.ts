import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/private/login/service/login.service';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss']
})
export class AddPostsComponent implements OnInit {
  highlightedImage = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  
  currentDate = new Date();
  username: string;

  selectedCategoryes:any = ['Default'];
  isfrmChecked:boolean = false;

  categoriesAll$: Observable<Category[]>;

  addPostForm: FormGroup = this.fb.group({
    id: [undefined],
    titlePost: [''],
    descriptionPost: [''],
    highlightedImage: [''],
    categories: [''],
    publicationDate: [''],
    author: [''],
    comments: ['']
  });

  constructor(
    private fb: FormBuilder,
    private postservice: PostService,
    private loginService: LoginService,
    private categoryService: CategoryService,
    private storage: AngularFireStorage,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u => {
      this.username = u.username;
    });
    this.categoriesAll$ = this.categoryService.getCategory();
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  checkCategory(event, isChecked){
    isChecked = event.target.checked;
  
    if(isChecked){
      this.isfrmChecked = true;
      this.selectedCategoryes.push(event.target.value);
    }else{
      this.isfrmChecked = false;
      let index = this.selectedCategoryes.indexOf(event.target.value)
      this.selectedCategoryes.splice(index, 1);
    }
    console.log(this.selectedCategoryes.filter((este, i) => this.selectedCategoryes.indexOf(este) === i))
  }

  addPost(){
    let post: Post = this.addPostForm.value;
    if (!post.id) {
        const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.addPostForm.value.highlightedImage = url;
              this.addPostForm.value.categories = this.selectedCategoryes.filter((category, i) => this.selectedCategoryes.indexOf(category) === i);
              this.addPostForm.value.publicationDate = this.currentDate;
              this.addPostForm.value.author= this.username;
              this.submit(post)
              this.router.navigateByUrl('/private/admin/list-posts');
            });
          })
        ).subscribe();
      
    } else {
      //this.updateServico(a);
    }
  }

  submit(p: Post){
    this.postservice.addPost(p)
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '35rem',
    minHeight: '1rem',
    placeholder: 'Digite o texto aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'customClasses',
        'insertUnorderedList',
        'insertOrderedList',
      ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    
  };

}
