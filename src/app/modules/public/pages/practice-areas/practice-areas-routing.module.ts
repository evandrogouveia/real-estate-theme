import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeAreasComponent } from './practice-areas.component';

const routes: Routes = [
  {
    path : '',
    component: PracticeAreasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeAreasRoutingModule { }
