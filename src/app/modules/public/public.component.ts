import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let currentRoute = this.router.routerState.snapshot.url;
    this.router.events.pipe(
      filter(r => r instanceof NavigationEnd)
      ).subscribe((e: NavigationEnd) => {
        e.url !== '/home' ?  
        document.body.classList.add('no-home') : 
        document.body.classList.remove('no-home');
      });
      currentRoute !== '/home' ? 
      document.body.classList.add('no-home') : 
      document.body.classList.remove('no-home');
  }

}
