import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from 'src/app/modules/private/admin/components/properties/models/property.model';
import { PropertiesService } from '../../properties/services/properties.service';

@Component({
  selector: 'app-cards-properties',
  templateUrl: './cards-properties.component.html',
  styleUrls: ['./cards-properties.component.scss']
})
export class CardsPropertiesComponent implements OnInit {
  @Input() hasPaginator: boolean;
  properties$: Observable<Property[]>;
  contentArray = [];
  returnedArray: Property[]
  itemsPerPage= 8;

  constructor(
    private propertiesService: PropertiesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.properties$ = this.propertiesService.getProperties();
    this.getPropertiesPagination();
  }

  getPropertiesPagination() {
    this.properties$.pipe(
      map(value => {
        this.contentArray = value;
        this.returnedArray = this.contentArray.slice(0,8);
      })
    ).subscribe();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  routerLinkId(idProperty) {
    this.router.navigate([`/properties/${idProperty}`]);
  }

}
