import { Component, OnInit } from '@angular/core';
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
      nome: [null, [Validators.required]],
      sabores: this.fb.array([]),
      valor: [null, [Validators.required]],
      valorFabrica: [null, [Validators.required]],
      dtCompra: [null, [Validators.required]],
      dtValidade: [null, [Validators.required]],
      fabricante: [null, [Validators.required]],
    });
  }


  criarFormulario(sorvete: Sorvete): void {
    this.cadastro = this.fb.group({
      id: [sorvete.id],
      nome: [sorvete.nome, [Validators.required]],
      sabores: this.arraySabores,
      valor: [sorvete.valor, [Validators.required]],
      valorFabrica: [sorvete.valorFabrica, [Validators.required]],
      dtCompra: [sorvete.dtCompra, [Validators.required]],
      dtValidade: [sorvete.dtValidade, [Validators.required]],
      fabricante: [sorvete.fabricante, [Validators.required]],
    });
  }

  formularioVazio() {
    this.cadastro = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      sabores: this.fb.array([]),
      valor: [null, [Validators.required]],
      valorFabrica: [null, [Validators.required]],
      dtCompra: [null, [Validators.required]],
      dtValidade: [null, [Validators.required]],
      fabricante: [null, [Validators.required]],
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
          this.arraySabores.push(new FormControl(false))
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

}
