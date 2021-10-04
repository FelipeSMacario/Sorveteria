import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { VendaService } from '../venda.service';
import { Page, Vendas } from '../vendas';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements OnInit {

  vendas: Vendas[] = [];
  
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  cadastro : FormGroup;
  nome : string;

  constructor(
    private vendaService : VendaService,
    private router : Router,
    private modal : ModalService,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
    this.findAllVenda();

    this.cadastro = this.fb.group({
      nome : [" "]
    })
  }

  findAllVenda() : void {
    this.vendaService.findAllVendas().subscribe({
      next : vend => {this.vendas = vend},
      error : err => console.log(err)
    })
  }

  editVendas(id : number){
    this.router.navigate(["vendas/novo", id])
  }

  modalDelete(vendas : Vendas){
    const result$ = this.modal.showConfirm("Confirma exclusão", "Desesa excluir permanentemente a venda?", "Confirmar", "Cancelar", "danger");
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.vendaService.deleteVenda(vendas.id) : EMPTY)
    ).subscribe(
      sucess => {this.modal.handleMessage("Venda excluída com sucesso", "success"); this.findAllVenda()},
      error => this.modal.handleMessage("Erro ao excluir a venda, tente novamente mais tarde", "danger")
    )
  }

  onTableDataChange(event){
    this.page = event;
    this.findAllVenda();
  }  

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.findAllVenda();
  }  


  filtrar(){
    this.vendaService.findSorveteByNome(this.cadastro.value.nome).subscribe({
      next : (valor) => {this.vendas = valor; },
      error : err => console.log(err)
    })
  }

  limpar(){
    this.cadastro.reset();
    this.findAllVenda();
  }
}
