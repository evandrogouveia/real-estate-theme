import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from './pages/shared/shared.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';



@NgModule({
  declarations: [
    PublicComponent,  
    HeaderComponent,
    FooterComponent,
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
