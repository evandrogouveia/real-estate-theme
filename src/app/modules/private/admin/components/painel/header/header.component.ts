import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/private/login/service/login.service';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imageSrc = 'assets/img/icons/user-empty.svg';

  constructor(
    private sidebarService: SidebarService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarService.toggleNavbar();
  }

  logout() {
    this.loginService.logout();
  }

}
