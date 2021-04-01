import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChildren('inputCategories') inputCategories: QueryList<ElementRef>

  highlightedImage = 'assets/img/placeholder.jpg';
  selectedImage: any = null;

  currentDate = new Date();
  publicationDate;
  username: string;

  selectedCategoryes: any = [];
  isfrmChecked: boolean = false;

  categoriesAll$: Observable<Category[]>;

  postId: string;
  isAddMode: boolean;
  myModel: any;

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u => {
      this.username = u.username;
    });
    this.categoriesAll$ = this.categoryService.getCategory();

    this.postId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.postId;


    if (!this.isAddMode) {
      const post: Observable<Post> = this.postservice.getPostDetail(this.postId).valueChanges();
      post.subscribe(data => {

        this.addPostForm.patchValue(data);
        this.publicationDate = data.publicationDate;

        if(data.highlightedImage)
          this.highlightedImage = data.highlightedImage;
          
        setTimeout(() => {
          this.inputCategories.toArray().forEach(d => {
            let b: any = [];
            b.push(d.nativeElement.value);//adiciona os valores dos inputs na variável b

            for (let i of data.categories) {
              let f: any = b.filter(c => c == i);//filtra o valor do input que seja igual ao valor que vem do banco

              if (d.nativeElement.value == f) {//clica nos inputs que estajam com valores iguais.
                d.nativeElement.click();
              }
            }
          });

        }, 600);

      });
    }
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/img/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  checkCategory(event, isChecked) { //remove e adiciona a categoria selecionada no array selectedCategoryes
    isChecked = event.target.checked;

    if (isChecked) {
      this.isfrmChecked = true;
      this.selectedCategoryes.push(event.target.value);
    } else {
      this.isfrmChecked = false;
      let index = this.selectedCategoryes.indexOf(event.target.value)
      this.selectedCategoryes.splice(index, 1);
    }
  }

  addPost() {
    let post: Post = this.addPostForm.value;
    if (!post.id) {

      //insere a categoria Default se não for selecionado nenhuma categoria
      const categories = this.selectedCategoryes.length === 0 ? this.selectedCategoryes = ['Default'] :
        this.selectedCategoryes.filter((category, i) => this.selectedCategoryes.indexOf(category) === i);

      //remove as tags html da descrição
      const description = this.addPostForm.value.descriptionPost.replace(/<[^>]*>/g, '');

      if (this.selectedImage) {
        const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.addPostForm.value.highlightedImage = url;
              this.addPostForm.value.categories = categories;
              this.addPostForm.value.descriptionPost = description;
              this.addPostForm.value.publicationDate = this.currentDate;
              this.addPostForm.value.author = this.username;
              this.postservice.addPost(post)
              this.router.navigateByUrl('/private/admin/list-posts');
            });
          })
        ).subscribe();
      } else {
        this.addPostForm.value.highlightedImage = this.highlightedImage;
        this.addPostForm.value.categories = categories;
        this.addPostForm.value.descriptionPost = description;
        this.addPostForm.value.publicationDate = this.currentDate;
        this.addPostForm.value.author = this.username;
        this.postservice.addPost(post)
        this.router.navigateByUrl('/private/admin/list-posts');
      }

    }
  }

  updatePost() {
    let post: Post = this.addPostForm.value;

    //insere a categoria Default se não for selecionado nenhuma categoria
    const categories = this.selectedCategoryes.length === 0 ? this.selectedCategoryes = ['Default'] :
      this.selectedCategoryes.filter((category, i) => this.selectedCategoryes.indexOf(category) === i);

    //remove as tags html da descrição
    const description = this.addPostForm.value.descriptionPost.replace(/<[^>]*>/g, '');

    if (this.selectedImage) {
      const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.addPostForm.value.highlightedImage = url;
            this.addPostForm.value.categories = categories;
            this.addPostForm.value.descriptionPost = description;
            //this.addPostForm.value.publicationDate = this.currentDate;
            this.addPostForm.value.author = this.username;
            this.postservice.updatePost(post)
            this.router.navigateByUrl('/private/admin/list-posts');
          });
        })
      ).subscribe();
    } else {
      this.addPostForm.value.highlightedImage = this.highlightedImage;
      this.addPostForm.value.categories = categories;
      this.addPostForm.value.descriptionPost = description;
      //this.addPostForm.value.publicationDate = this.currentDate;
      this.addPostForm.value.author = this.username;
      this.postservice.updatePost(post)
      this.router.navigateByUrl('/private/admin/list-posts');
    }
  }

  submit() {
    if (this.isAddMode) {
      this.addPost();
    } else {
      this.updatePost();
    }
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
