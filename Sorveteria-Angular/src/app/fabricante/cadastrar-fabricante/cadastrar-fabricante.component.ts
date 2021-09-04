import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Fabricante } from '../fabricante.model';
import { FabricanteService } from '../fabricante.service';
import { ModalService } from 'src/app/shared/modal/modal.service';


@Component({
  selector: 'app-cadastrar-fabricante',
  templateUrl: './cadastrar-fabricante.component.html',
  styleUrls: ['./cadastrar-fabricante.component.css'],
})
export class CadastrarFabricanteComponent implements OnInit {
  cadastro: FormGroup;
  fabricante: Fabricante;
  id : number;

  constructor(
    private fb: FormBuilder,
    private fabricanteService: FabricanteService,
    private activatedRoute: ActivatedRoute,
    private modaService : ModalService
  ) {}

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.fabricanteService.findFabricanteById(this.id).subscribe((fabricante: Fabricante) => this.criarFormulario(fabricante));
    }  else { 
        this.criarFormulario(this.formularioVazio());
      }

  }

  criarFormulario(fabricante : Fabricante) : void{
    this.cadastro = this.fb.group({
      id: [fabricante.id],
      nome: [fabricante.nome, [Validators.required]],
      contato: [fabricante.contato, [Validators.required]],
    });
  }

  formularioVazio(): Fabricante {
    return {
      id: null,
      nome: null,
      contato: null,
    } as unknown as Fabricante;
  }



  findFabricanteById(id: number) {
    this.fabricanteService.findFabricanteById(id).subscribe();
  }

  saveFabricante(): void {
    this.fabricanteService.saveFabricante(this.cadastro.value).subscribe({
      next: (fabricante) => {
        this.modaService.handleMessage("Fabricante cadastrado com sucesso", "success");
        console.log('Salvo com sucesso', fabricante);
        this.cadastro.reset();
      },
      error: (err) => {
        this.modaService.handleMessage("Erro ao cadastrar o fabricante", "danger");
        console.log('Erro', err)},
    });
  }
}
