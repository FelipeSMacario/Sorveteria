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

@Component({
  selector: 'app-cadastrar-fabricante',
  templateUrl: './cadastrar-fabricante.component.html',
  styleUrls: ['./cadastrar-fabricante.component.css'],
})
export class CadastrarFabricanteComponent implements OnInit {
  cadastro: FormGroup;
  fabricante: Fabricante;

  constructor(
    private fb: FormBuilder,
    private fabricanteService: FabricanteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.fabricanteService.findFabricanteById(id))
      )
    .subscribe(
      fabricante => this.updateForm(fabricante));
    

    this.cadastro = this.fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      contato: [null, [Validators.required]],
    });
  }

  updateForm(fabricante: Fabricante) {
    this.cadastro.patchValue({
      id: fabricante.id,
      nome: fabricante.nome,
      contato: fabricante.contato,
    });
  }

  findFabricanteById(id: number) {
    this.fabricanteService.findFabricanteById(id).subscribe;
  }

  saveFabricante(): void {
    this.fabricanteService.saveFabricante(this.cadastro.value).subscribe({
      next: (course) => {
        console.log('Saved with sucess', course);
        this.cadastro.reset();
      },
      error: (err) => console.log('Error', err),
    });
  }
}
