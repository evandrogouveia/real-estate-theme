import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PracticeAreasComponent } from './pages/practice-areas/practice-areas.component';
import { SharedModule } from './pages/shared/shared.module';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';



@NgModule({
  declarations: [
    PublicComponent, 
    PracticeAreasComponent,  
    AboutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class PublicModule { }
