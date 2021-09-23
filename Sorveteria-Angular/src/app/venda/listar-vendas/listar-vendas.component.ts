import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { VendaService } from '../venda.service';
import { Vendas } from '../vendas';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements OnInit {

  vendas: Vendas[] = [];

  constructor(
    private vendaService : VendaService,
    private router : Router,
    private modal : ModalService) { }

  ngOnInit(): void {
    this.findAllVenda();
  }

  findAllVenda() : void {
    this.vendaService.findAllVendas().subscribe({
      next : vend => this.vendas = vend,
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

}
