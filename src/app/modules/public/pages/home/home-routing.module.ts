import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { PracticeAreasComponent } from '../practice-areas/practice-areas.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent
  },
  {
    path : 'practice-areas',
    component: PracticeAreasComponent
  },
  {
    path : 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
