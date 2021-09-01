import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Fabricante } from 'src/app/fabricante/fabricante.model';
import { FabricanteService } from 'src/app/fabricante/fabricante.service';
import { Sorvete } from '../sorvete.model';
import { SorveteService } from '../sorvete.service';

@Component({
  selector: 'app-cadastrar-sorvete',
  templateUrl: './cadastrar-sorvete.component.html',
  styleUrls: ['./cadastrar-sorvete.component.css'],
})
export class CadastrarSorveteComponent implements OnInit {
  fabricante : Fabricante[] = [];
  cadastro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sorveteService: SorveteService,
    private activatedRoute: ActivatedRoute,
    private fabricanteService : FabricanteService
  ) {}

  ngOnInit(): void {

    this.findAllFabricantes();

    this.activatedRoute.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id) => this.sorveteService.findSorveteById(id))
      )
      .subscribe((sorvete) => this.updateForm(sorvete));

    this.cadastro = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      sabor: [null, [Validators.required]],
      fabricante: ["Selecione um fabricante", [Validators.required]],
    });
  }

  findAllFabricantes(): void {
    this.fabricanteService.findAllFabricantes().subscribe({
      next: (fabri) => (this.fabricante = fabri),
      error: (err) => console.log('Erro', err),
    });
  }

  updateForm(sorvete: Sorvete) {
    this.cadastro.patchValue({
      id: sorvete.id,
      nome: sorvete.nome,
      sabor: sorvete.sabor,
      fabricante: sorvete.fabricante,
    });
  }

  findSorveteById(id: number) {
    this.sorveteService.findSorveteById(id).subscribe();
  }

  saveSorvete(): void {
    this.sorveteService.saveSorvete(this.cadastro.value).subscribe({
      next: (sorvete) => {
        console.log('Cadastrado com sucesso', sorvete);
        this.cadastro.reset();
      },
      error: (err) => console.log('Erro', err),
    });
  }
}
