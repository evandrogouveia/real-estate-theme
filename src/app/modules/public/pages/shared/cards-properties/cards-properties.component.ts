import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from 'src/app/modules/private/admin/components/properties/models/property.model';
import { PropertiesService } from '../../properties/services/properties.service';

@Component({
  selector: 'app-cards-properties',
  templateUrl: './cards-properties.component.html',
  styleUrls: ['./cards-properties.component.scss']
})
export class CardsPropertiesComponent implements OnInit {

  properties$: Observable<Property[]>;

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit(): void {
    this.properties$ = this.propertiesService.getProperties();
    this.properties$.subscribe(d => console.log(d))
  }

}
