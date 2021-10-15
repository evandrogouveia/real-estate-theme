import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/modules/private/login/service/login.service';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  highlightedImage = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  loading: boolean = false;
  currentDate = new Date();
  publicationDate;

  propertyId: string;
  isAddMode: boolean;

  addPropertyForm: FormGroup = this.fb.group({
    id: [undefined],
    titleProperty: [''],
    priceProperty: [''],
    descriptionProperty: [''],
    highlightedImageProperty: [''],
    locationProperty: [''],
    categoriesProperty: [''],
    publicationDateProperty: [''],
    qtdBedrooms: [''],
    qtdBathrooms: [''],
    qtdGarages: [''],
    areaProperty: [''],
  });

  constructor(
    private fb: FormBuilder,
    private propertyservice: PropertyService,
    private loginService: LoginService,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.propertyId;

    if (!this.isAddMode) {
      const post: Observable<Property> = this.propertyservice.getPropertyDetail(this.propertyId).valueChanges();
      post.subscribe(data => {

        this.addPropertyForm.patchValue(data);
        this.publicationDate = data.publicationDateProperty;

        if(data.highlightedImageProperty)
          this.highlightedImage = data.highlightedImageProperty;
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

  addPost() {
    this.loading = true;
    const property: Property = this.addPropertyForm.value;
    if (!property.id) {

      //insere a categoria Default se não for selecionado nenhuma categoria
      /*const categories = this.selectedCategoryes.length === 0 ? this.selectedCategoryes = ['Default'] :
        this.selectedCategoryes.filter((category, i) => this.selectedCategoryes.indexOf(category) === i);*/

      //remove as tags html da descrição
      const description = this.addPropertyForm.value.descriptionProperty.replace(/<[^>]*>/g, '');

      if (this.selectedImage) {
        const filePath = `imagem/${this.selectedImage.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);

        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.addPropertyForm.value.highlightedImage = url;
              this.addPropertyForm.value.descriptionProperty = description;
              this.addPropertyForm.value.publicationDate = this.currentDate;
              this.propertyservice.addProperty(property).then(() => {
                this.loading = false;
                this.toastr.success('Propriedade adicionada com sucesso');
              });
              this.router.navigateByUrl('/private/admin/list-properties');
            });
          })
        ).subscribe();
      } else {
        this.addPropertyForm.value.highlightedImage = this.highlightedImage;
        this.addPropertyForm.value.descriptionProperty = description;
        this.addPropertyForm.value.publicationDate = this.currentDate;
        this.addPropertyForm.value.comments = [];
        this.propertyservice.addProperty(property).then(() => {
          this.loading = false;
          this.toastr.success('Propriedade adicionada com sucesso');
        });
        this.router.navigateByUrl('/private/admin/list-posts');
      }

    }
  }

  submit() {
    if (this.isAddMode) {
      this.addPost();
    } else {
      console.log('update');
    }
  }

  // tslint:disable-next-line: member-ordering
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
