import { Component, OnInit } from '@angular/core';
import { EditFooterService } from 'src/app/modules/private/admin/components/edit-theme/edit-footer/services/edit-footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footer = [];

  constructor(private editFooterService: EditFooterService) { }

  ngOnInit(): void {
    this.editFooterService.getFooter().subscribe(footer => {
      this.footer = footer;
      console.log(footer)
    });
  }

}
