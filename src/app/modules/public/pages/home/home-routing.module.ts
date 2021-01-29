import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
