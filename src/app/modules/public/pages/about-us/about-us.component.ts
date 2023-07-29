import { Component, OnInit } from '@angular/core';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  quemSomos = [];

  constructor(private editThemeService: EditThemeService) { }

  ngOnInit(): void {
    this.editThemeService.getAllQuemSomos().subscribe(data => {
      this.quemSomos = data;
      console.log(data)
    })
  }

}
