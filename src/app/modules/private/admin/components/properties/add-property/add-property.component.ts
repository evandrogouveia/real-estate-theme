import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
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

  highlightedImageProperty = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  loading: boolean = false;
  currentDate = new Date();
  publicationDateProperty;

  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

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
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.propertyId;

    if (!this.isAddMode) {
      const post: Observable<Property> = this.propertyservice.getPropertyDetail(this.propertyId).valueChanges();
      post.subscribe(data => {

        this.addPropertyForm.patchValue(data);
        this.publicationDateProperty = data.publicationDateProperty;

        if(data.highlightedImageProperty)
          this.highlightedImageProperty = data.highlightedImageProperty;
      });
    }
    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImageProperty = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImageProperty = 'assets/img/placeholder.jpg';
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
              this.addPropertyForm.value.highlightedImageProperty = url;
              this.addPropertyForm.value.descriptionProperty = description;
              this.addPropertyForm.value.publicationDateProperty = this.currentDate;
              this.propertyservice.addProperty(property).then(() => {
                this.loading = false;
                this.toastr.success('Propriedade adicionada com sucesso');
              });
              this.router.navigateByUrl('/private/admin/list-properties');
            });
          })
        ).subscribe();
      } else {
        this.addPropertyForm.value.highlightedImageProperty = this.highlightedImageProperty;
        this.addPropertyForm.value.descriptionProperty = description;
        this.addPropertyForm.value.publicationDateProperty = this.currentDate;
        this.addPropertyForm.value.comments = [];
        this.propertyservice.addProperty(property).then(() => {
          this.loading = false;
          this.toastr.success('Imóvel adicionado com sucesso');
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

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  // tslint:disable-next-line: member-ordering
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
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
