import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-banner-pages',
  templateUrl: './entry-banner-pages.component.html',
  styleUrls: ['./entry-banner-pages.component.scss']
})
export class EntryBannerPagesComponent implements OnInit {
  @Input() title: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
