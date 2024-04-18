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
  @Input() itemsPerPage = 8;
  properties$: Observable<Propriedades>;
  contentArray: any = [];
  returnedArray: Propriedades[];
  loading = false;
  
  home = [];

  themeConfigSkeletonImage = {
    width: '100%',
    height: '170px',
    position: 'absolute',
    left: '0',
    'border-radius': '10px 10px 0 0'
  }


  themeConfigSkeletonTitulo = {
    width: '85%',
    height: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

  themeConfigSkeletonEndereco = {
    width: '85%',
    height: '20px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

  themeConfigSkeletonOpcoes = {
    width: '85%',
    height: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'border-radius': '10px'
  }

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
    this.loading = true;
    this.properties$.pipe(
      map((value: any) => {
        this.contentArray = value;
        this.returnedArray = this.contentArray.slice(0,this.itemsPerPage);
      })
    ).subscribe(() => this.loading = false);
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
