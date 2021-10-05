import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sabores } from '../sabores.model';
import { SaboresService } from '../sabores.service';

@Component({
  selector: 'app-cadastrar-sabores',
  templateUrl: './cadastrar-sabores.component.html',
  styleUrls: ['./cadastrar-sabores.component.css']
})
export class CadastrarSaboresComponent implements OnInit {

  cadastro : FormGroup;

  id : number;

  constructor(
    private fb : FormBuilder,
    private saboresService : SaboresService,
    private activedRoute : ActivatedRoute,
    private modal : ModalService
  ) { }

  ngOnInit(): void {

    this.id = this.activedRoute.snapshot.params['id'];

    if (this.id) {

      this.saboresService.findSaboresById(this.id).subscribe({
        next : sabor => this.formValor(sabor),
        error : err => console.log(err)
      })

    }
    else {
      this.formVazio();
    }


    this.cadastro = this.fb.group({
      nome : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]]
    })
  }

  formVazio(){
    this.cadastro = this.fb.group({
      nome : [null]
    })
  }

  formValor(sabores : Sabores) {
    this.cadastro = this.fb.group({
      id : sabores.id,
      nome : sabores.nome
    })
  }


  saveFabricante(){
    this.saboresService.saveSabores(this.cadastro.value).subscribe({
      next : sab => { this.modal.handleMessage(
        'Sabor cadastrado com sucesso',
        'success'
      );
        console.log("Cadastrado com sucesso!", sab)},
      error : err => { this.modal.handleMessage(
        'Erro ao cadastrar o sorvete',
        'danger'
      );
        console.log(err)}
    })
  }



}


