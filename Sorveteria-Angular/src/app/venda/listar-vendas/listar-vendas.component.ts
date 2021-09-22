import { Component, OnInit } from '@angular/core';
import { VendaService } from '../venda.service';
import { Vendas } from '../vendas';

@Component({
  selector: 'app-listar-vendas',
  templateUrl: './listar-vendas.component.html',
  styleUrls: ['./listar-vendas.component.css']
})
export class ListarVendasComponent implements OnInit {

  vendas: Vendas[] = [];

  constructor(private vendaService : VendaService) { }

  ngOnInit(): void {
    this.findAllVenda();
  }

  findAllVenda() : void {
    this.vendaService.findAllVendas().subscribe({
      next : vend => this.vendas = vend,
      error : err => console.log(err)
    })
  }

}
