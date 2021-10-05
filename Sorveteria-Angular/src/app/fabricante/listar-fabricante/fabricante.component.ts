import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  bsModalRef : BsModalRef;

  cadastro : FormGroup;

  constructor(
    private fabricanteService: FabricanteService,
    private router: Router,
    private modalService : ModalService,
    private fb : FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAllFabricantes();
    this.cadastroForm();   
  }

  cadastroForm(){
    this.cadastro = this.fb.group({      
      nome : [null]
    })
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
    const result$ = this.modalService.showConfirm("Confirma exclusão", "Deseja excluir permanentemente o fabricante?", "Confirmar", "Cancelar", "danger" );
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.fabricanteService.deleteFabricante(fabricante.id) : EMPTY)
    ).subscribe(
      sucess => {this.modalService.handleMessage("Sorvete excluído com sucesso", "success"); this.findAllFabricantes()},
      error => this.modalService.handleMessage("Erro ao excluir o sorvete, tente novamente mais tarde", "danger")
    )
  }

  filtrar(){
    if (this.cadastro.value.nome != null) {
    this.fabricanteService.findFabricantesByNome(this.cadastro.value.nome).subscribe({
      next : (valor) => {this.fabricantes = valor; this.cadastro.reset()},
      error : err => console.log(err)
    })}
  }

  limpar(){
    this.cadastro.reset();
    this.findAllFabricantes();
  }

}
