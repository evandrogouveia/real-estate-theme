import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { arrayIcones } from '../../shared/arrayIcones';
import { EditThemeService } from '../services/edit-theme.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  icones = arrayIcones;

  isAddMode: boolean;

  contatoForm: FormGroup = this.fb.group({
    ID: [],
    titulo: [''],
    coluna1: this.fb.group({
      icone1: [''],
      tituloColuna1: [''],
      descricaoColuna1: [''],
    }),
    coluna2: this.fb.group({
      icone2: [''],
      tituloColuna2: [''],
      descricaoColuna2: [''],
    }),
    coluna3: this.fb.group({
      icone3: [''],
      tituloColuna3: [''],
      descricaoColuna3: [''],
    }),
    coluna4: this.fb.group({
      icone4: [''],
      tituloColuna4: [''],
      descricaoColuna4: [''],
    }),
    linkMapa: ['']
  });

  constructor(
    private fb: FormBuilder,
    private editThemeService: EditThemeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isAddMode = true;
    this.setDataForms();
  }

  setDataForms() {
    this.editThemeService.getAllDadosContatos().subscribe(data => {
      console.log(data)
      if (data[0]) {
        this.contatoForm.patchValue(data[0]);
      }
    });

  }

  addUpdateContato() {
    const ID = this.contatoForm.controls.ID.value;

    if (ID) {
      this.editThemeService.updateDadosContatos(ID, this.contatoForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados atualizado com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao atualizar dados, tente novamente mais tarde', '');
      });
    } else {
      this.editThemeService.newDadosContatos(this.contatoForm.value).subscribe(() => {
        this.setDataForms();
        this.toastr.success('Dados salvo com sucesso', '');
      }, (err) => {
        this.toastr.error('Ocorreu um erro ao salvar dados, tente novamente mais tarde', '');
      });
    }
  }
}
