import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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
  bsModalRef : BsModalRef;

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
    const result$ = this.modalService.showConfirm("Confirma exclusão", "Deseja excluir permanentemente o fabricante?", "Confirmar", "Excluir", "danger" );
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.fabricanteService.deleteFabricante(fabricante.id) : EMPTY)
    ).subscribe(
      sucess => {this.modalService.handleMessage("Sorvete excluído com sucesso", "success"); this.findAllFabricantes()},
      error => this.modalService.handleMessage("Erro ao excluir o sorvete, tente novamente mais tarde", "danger")
    )
  }

}
