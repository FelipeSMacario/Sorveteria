import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private activedRoute : ActivatedRoute
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
      nome : [null]
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
      next : sab => console.log("Cadastrado com sucesso!", sab),
      error : err => console.log(err)
    })
  }



}

