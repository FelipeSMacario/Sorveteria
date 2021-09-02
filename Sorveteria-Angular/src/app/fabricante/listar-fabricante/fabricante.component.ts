import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Fabricante } from '../fabricante.model';
import { FabricanteService } from '../fabricante.service';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css'],
})
export class FabricanteComponent implements OnInit {
  fabricantes: Fabricante[] = [];

  constructor(
    private fabricanteService: FabricanteService,
    private router: Router,
    private modalService : ModalService
  ) {}

  ngOnInit(): void {
    this.findAllFabricantes();
  }

  findAllFabricantes(): void {
    this.fabricanteService.findAllFabricantes().subscribe({
      next: (fabri) => (this.fabricantes = fabri),
      error: (err) => console.log('Erro', err),
    });
  }

  edit(id: number) {
    this.router.navigate(['fabricante/novo', id]);
  }

  modalDelete(fabricante : Fabricante){
    const result$ = this.modalService.showConfirm("Confirma exclusão", "Deseja excluir permanentemente o fabricante?" );
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.fabricanteService.deleteFabricante(fabricante.id) : EMPTY)
    ).subscribe(
      sucess => {console.log("Removido com sucesso!"); this.findAllFabricantes()},
      error => console.log("Erro ao remover o fabricante")
    )
  }
}
