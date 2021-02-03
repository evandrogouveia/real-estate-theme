import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/img/admin/user-empty.svg';

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarService.toggleNavbar();
  }

}
