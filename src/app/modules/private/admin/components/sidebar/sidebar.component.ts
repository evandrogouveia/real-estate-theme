import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  retract: string;

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.sidebarService.obterToggle()
      .subscribe(valor => { // setar o valor vindo do service na variável.
        this.retract = valor;
    });
  }
  
}
