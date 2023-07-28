import { Component, OnInit } from '@angular/core';
import { EditThemeService } from 'src/app/modules/private/admin/components/edit-theme/services/edit-theme.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contato = [];

  constructor(private editThemeService: EditThemeService ) { }

  ngOnInit(): void {
    this.editThemeService.getAllDadosContatos().subscribe(contato => {
      this.contato = contato;
      console.log(contato)
    });
  }

}
