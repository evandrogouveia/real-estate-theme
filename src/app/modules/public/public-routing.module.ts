import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'about', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'practice-areas', loadChildren: () => import('./pages/practice-areas/practice-areas.module').then(m => m.PracticeAreasModule) },
      { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },
      { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
