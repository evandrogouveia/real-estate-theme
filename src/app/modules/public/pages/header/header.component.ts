import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { Topbar } from 'src/app/modules/private/admin/components/edit-theme/edit-header/models/topbar.model';
import { HeaderService } from 'src/app/modules/private/admin/components/edit-theme/edit-header/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollPosition;
  toggled = true;
  retract = 'toggled';
  headerData: any = [];

  inputLoading = false;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    //FIXAR HEADER
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });
    this.inputLoading = true;
    this.headerService.getHeader().subscribe(data => {
      if (data) {
        setTimeout(() => {
          this.inputLoading = false;
        }, 1500)
      } 
      this.headerData = data
    });

  
  }

  toggleSidebar() {
    this.toggled = !this.toggled;
    if (this.toggled === false) {
      this.retract = '';
    } else {
      this.retract = 'toggled';
    }
  }

}
