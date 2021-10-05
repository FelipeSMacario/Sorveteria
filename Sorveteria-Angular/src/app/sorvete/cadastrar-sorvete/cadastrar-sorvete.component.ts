import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Fabricante } from 'src/app/fabricante/fabricante.model';
import { FabricanteService } from 'src/app/fabricante/fabricante.service';
import { Sabores } from 'src/app/sabores/sabores.model';
import { SaboresService } from 'src/app/sabores/sabores.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sorvete } from '../sorvete.model';
import { SorveteService } from '../sorvete.service';

@Component({
  selector: 'app-cadastrar-sorvete',
  templateUrl: './cadastrar-sorvete.component.html',
  styleUrls: ['./cadastrar-sorvete.component.css'],
})
export class CadastrarSorveteComponent implements OnInit {
  fabricante: Fabricante[] = [];
  sabores: Sabores[] = [];
  cadastro: FormGroup;
  id: number;
  sorvete: Sorvete;

  constructor(
    private fb: FormBuilder,
    private sorveteService: SorveteService,
    private activatedRoute: ActivatedRoute,
    private fabricanteService: FabricanteService,
    private modalService: ModalService,
    private saboresService: SaboresService
  ) {}

  ngOnInit(): void {

    this.findAllFabricantes();
    this.findAllSabores();

    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.sorveteService
        .findSorveteById(this.id)
        .subscribe((sorvete: Sorvete) => {
          this.criarFormulario(sorvete);
          this.sorvete = sorvete;
        })
        const valorAsync = new Promise((resolve, reject) => {
          setTimeout(() => resolve(this.checkbox()), 500)
        });
    } else {
      this.formularioVazio();
    }

    this.cadastro = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      sabores: this.fb.array([]),
      validacao : [null, [Validators.min(1), Validators.required]],
      quantidadeEstoque : [null, [Validators.required, Validators.min(1), Validators.max(10000)]],
      valor: [null, [Validators.required, Validators.min(0.1)]],
      valorFabrica: [null, [Validators.required, Validators.min(0.1)]],
      dtCompra: [null, [Validators.required]],
      dtValidade: [null, [Validators.required, this.validaValidade]],
      fabricante: [null, [Validators.required]],
    });
  }

  criarFormulario(sorvete: Sorvete): void {
    this.cadastro = this.fb.group({
      id: [sorvete.id],
      nome: [sorvete.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      sabores: this.arraySabores,
      validacao : [sorvete.sabores.length, [Validators.min(1), Validators.required]],
      quantidadeEstoque : [sorvete.quantidadeEstoque, [Validators.required, Validators.min(1), Validators.max(10000)]],
      valor: [sorvete.valor, [Validators.required, Validators.min(0.1)]],
      valorFabrica: [sorvete.valorFabrica, [Validators.required, Validators.min(0.1)]],
      dtCompra: [sorvete.dtCompra, [Validators.required]],
      dtValidade: [sorvete.dtValidade, [Validators.required, this.validaValidade]],
      fabricante: [sorvete.fabricante, [Validators.required]],
    });
  }

  formularioVazio() {
    this.cadastro = this.fb.group({
      id: [null],
      nome: [null],
      sabores: this.fb.array([]),
      quantidadeEstoque : [null],
      valor: [null],
      valorFabrica: [null],
      dtCompra: [null],
      dtValidade: [null],
      fabricante: [null],
    });
  }

  get arraySabores() {
    return this.cadastro.controls.sabores as FormArray;
  }

  findAllFabricantes(): void {
    this.fabricanteService.findAllFabricantes().subscribe({
      next: (fabri) => (this.fabricante = fabri),
      error: (err) => console.log('Erro', err),
    });
  }

  saveSorvete(): void {
    this.cadastro.value.sabores = this.cadastro.value.sabores
      .map((checked, i) => checked ? this.sabores[i] : null)
      .filter((v) => v !== null);

    this.sorveteService.saveSorvete(this.cadastro.value).subscribe({
      next: (sorvete) => {
        this.modalService.handleMessage(
          'Sorvete cadastrado com sucesso',
          'success'
        );
        console.log('Cadastrado com sucesso', sorvete);
        this.cadastro.reset();
      },
      error: (err) => {
        this.modalService.handleMessage(
          'Erro ao cadastrar o sorvete',
          'danger'
        );
        console.log('Erro', err);
      },
    });
  }

  compararFabricante(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 && obj2;
  }

  findAllSabores(): void {
    this.saboresService.findAllSabores().subscribe({
      next: (sab) => {
        this.sabores = sab;
        this.sabores.forEach(() =>
          this.arraySabores.push(new FormControl(false,[Validators.required]))
        );
      },
      error: (err) => console.log('Erro', err),
    });
  }


  checkbox() {
    if (this.sorvete.sabores.length > 0) {
      for (let c = 0; c < this.sabores.length; c++) {
        for (let d = 0; d < this.sorvete.sabores.length; d++) {
          if (this.sabores[c].id == this.sorvete.sabores[d].id) {
            this.arraySabores.controls[c].setValue([true]);
          }
        }
      }
    }
  }

  validaCheckbox(event){
    if(event.target.checked){
      this.cadastro.controls.validacao.setValue( this.cadastro.controls.validacao.value + 1);

    } else {
      this.cadastro.controls.validacao.setValue(this.cadastro.controls.validacao.value - 1);

    }
  }

  validaValidade(input : FormControl) {
    
    const dataAtual = input.value;
    let dataHoje = new Date();

    if(dataAtual && dataAtual != "" ){
      return formatDate(dataAtual, "dd/MM/yyyy", 'en-US')
       > formatDate(dataHoje, "dd/MM/yyyy", 'en-US') ? null : {dataInvalida : true};
    }

    return null
  }

}
