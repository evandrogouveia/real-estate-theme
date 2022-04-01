import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { Property } from 'src/app/modules/private/admin/components/properties/models/property.model';
import { PropertiesService } from '../../services/properties.service';

const data = [
  {
    srcUrl: 'assets/img/properties/1.jpg',
    previewUrl: 'assets/img/properties/1.jpg'
  },
  {
    srcUrl: 'assets/img/properties/2.jpg',
    previewUrl: 'assets/img/properties/2.jpg'
  },
  {
    srcUrl: 'assets/img/properties/3.jpg',
    previewUrl: 'assets/img/properties/3.jpg'
  },
  {
    srcUrl: 'assets/img/properties/4.jpg',
    previewUrl: 'assets/img/properties/4.jpg'
  },
  {
    srcUrl: 'assets/img/properties/5.jpg',
    previewUrl: 'assets/img/properties/5.jpg'
  },
  {
    srcUrl: 'assets/img/properties/6.jpg',
    previewUrl: 'assets/img/properties/6.jpg'
  },
  {
    srcUrl: 'assets/img/properties/7.jpg',
    previewUrl: 'assets/img/properties/7.jpg'
  },
  {
    srcUrl: 'assets/img/properties/8.jpg',
    previewUrl: 'assets/img/properties/8.jpg'
  },

];

const dataPlans = [
  {
    srcUrl: 'assets/img/planta1.jpg',
    previewUrl: 'assets/img/planta1.jpg'
  },
  {
    srcUrl: 'assets/img/planta2.jpg',
    previewUrl: 'assets/img/planta2.jpg'
  },
  {
    srcUrl: 'assets/img/planta1.jpg',
    previewUrl: 'assets/img/planta1.jpg'
  },
  {
    srcUrl: 'assets/img/planta2.jpg',
    previewUrl: 'assets/img/planta2.jpg'
  },
  {
    srcUrl: 'assets/img/planta1.jpg',
    previewUrl: 'assets/img/planta1.jpg'
  },
  {
    srcUrl: 'assets/img/planta2.jpg',
    previewUrl: 'assets/img/planta2.jpg'
  },
  {
    srcUrl: 'assets/img/planta1.jpg',
    previewUrl: 'assets/img/planta1.jpg'
  },
  {
    srcUrl: 'assets/img/planta2.jpg',
    previewUrl: 'assets/img/planta2.jpg'
  },
];

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {
  properties$: Observable<Property[]>;
  propertyId$: Observable<Property>;

  items: GalleryItem[];
  imageData = data;
  url: any;

  itemsPlans: GalleryItem[];
  plansData = dataPlans;

  bsInlineValue = new Date();

  constructor(
    private propertiesService: PropertiesService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.properties$ = this.propertiesService.getProperties();
    this.propertyId$ = this.propertiesService.getPropertyDetail(propertyId).valueChanges();
    this.url = window.location.href;
    this.getGalleryTop();
    this.getGalleryPlans();

    this.propertyId$.subscribe(d => console.log(d))
  }

  getGalleryTop() {
    this.items = this.imageData.map(item => new ImageItem({
      src: item.srcUrl, thumb: item.previewUrl
    }));

    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });
    lightboxRef.load(this.items);
  }

  getGalleryPlans() {
    this.itemsPlans = this.plansData.map(item => new ImageItem({
      src: item.srcUrl, thumb: item.previewUrl
    }));

    const galleryBoxRef = this.gallery.ref('gallery-plans');

    galleryBoxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumb: false,
      counter: false,
      loop: true,
    });
    galleryBoxRef.load(this.itemsPlans);
  }

}
