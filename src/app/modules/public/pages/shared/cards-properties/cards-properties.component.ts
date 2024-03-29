import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';
import { PropriedadesService } from 'src/app/modules/private/admin/components/properties/services/propriedades.service';


@Component({
  selector: 'app-cards-properties',
  templateUrl: './cards-properties.component.html',
  styleUrls: ['./cards-properties.component.scss']
})
export class CardsPropertiesComponent implements OnInit {
  @Input() hasPaginator: boolean;
  @Input() dataHome: any;
  properties$: Observable<Propriedades>;
  contentArray: any = [];
  returnedArray: Propriedades[]
  itemsPerPage= 8;
  home = [];

  constructor(
    private propriedadesService: PropriedadesService,
    private router: Router,
    private editThemeService: EditThemeService
    ) { }

  ngOnInit(): void {
    this.properties$ = this.propriedadesService.getAllPropriedades();
    this.getPropertiesPagination();

    this.editThemeService.getAllDadosHome().subscribe(home => {
      this.home = home;
    });
  }

  getPropertiesPagination() {
    this.properties$.pipe(
      map((value: any) => {
        this.contentArray = value;
        this.returnedArray = this.contentArray.slice(0,8);
      })
    ).subscribe();
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 1150);
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  routerLinkId(idProperty) {
    this.router.navigate([`/propriedades/${idProperty}`]);
  }

}
