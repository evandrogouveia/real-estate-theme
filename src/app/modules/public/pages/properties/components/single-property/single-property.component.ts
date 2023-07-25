import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { Observable } from 'rxjs';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

  properties$: Observable<Propriedades>;
  propertyId$: Observable<Propriedades>;

  propriedadeID = [];

  url: any;
  items: GalleryItem[];
  itemsPlans: GalleryItem[];

  bsInlineValue = new Date();

  neighborhoodAndCity: string;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: null
      })
    ],
    zoom: 16,
  }

  constructor(
    private propriedadesService: PropriedadesService,
    public gallery: Gallery,
    public lightbox: Lightbox,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.properties$ = this.propriedadesService.getAllPropriedades();
    this.url = window.location.href;
    this.getPropriedade();
  }

  getPropriedade() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.propriedadesService.getPropriedadeID(propertyId).subscribe((p: any) => {
      p[0].endereco = JSON.parse(p[0].endereco);
      this.getGalleryTop(p);
      this.getGalleryPlans(p);
      this.propriedadeID = p;
      this.initMarkers(p[0]);
    });
  }

  initMarkers(propriedade) {
    console.log(parseFloat(propriedade.endereco.latitude))
    const initialMarkers = [
      {
        position: { lat: parseFloat(propriedade.endereco.latitude), lng: parseFloat(propriedade.endereco.longitude) },
        draggable: false,
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${propriedade.titulo}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
    }
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  generateMarker(data: any, index: number) {
    const myIcon = Leaflet.icon({
      iconUrl: 'assets/img/custom-marker.png',
      iconSize: [50, 50],
      iconAnchor: [22, 94],
      popupAnchor: [4, -90],
      shadowUrl: null,
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
  });
    return Leaflet.marker(data.position, {icon: myIcon, draggable: data.draggable });
  }

  getGalleryTop(p) {
    const dataGallery = JSON.parse(p[0].imagens);
    this.items = dataGallery.map(item => new ImageItem({
      src: item, thumb: item
    }));

    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top,
    });
    lightboxRef.load(this.items);
  }

  getGalleryPlans(p) {
    const dataPlantas = JSON.parse(p[0].plantas);
    this.itemsPlans = dataPlantas.map(item => new ImageItem({
      src: item, thumb: item
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
