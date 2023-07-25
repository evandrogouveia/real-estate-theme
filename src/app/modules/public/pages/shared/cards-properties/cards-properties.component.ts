import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';
import { PropertiesService } from '../../properties/services/properties.service';

@Component({
  selector: 'app-cards-properties',
  templateUrl: './cards-properties.component.html',
  styleUrls: ['./cards-properties.component.scss']
})
export class CardsPropertiesComponent implements OnInit {
  @Input() hasPaginator: boolean;
  properties$: Observable<Propriedades>;
  contentArray: any = [];
  returnedArray: Propriedades[]
  itemsPerPage= 8;

  constructor(
    private propriedadesService: PropriedadesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.properties$ = this.propriedadesService.getAllPropriedades();
    this.getPropertiesPagination();
  }

  getPropertiesPagination() {
    this.properties$.pipe(
      map((value: any) => {
        value.map(p => p.endereco = JSON.parse(p.endereco))
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
