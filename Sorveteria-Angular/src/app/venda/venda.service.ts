
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendas } from './vendas';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  vendaURL : string = "http://localhost:8080/vendas";

  constructor(private httpCliente : HttpClient) { }

  findAllVendas() : Observable<Vendas[]>{
    return this.httpCliente.get<Vendas[]>(`${this.vendaURL}`);
  }

  saveVendas(vendas : Vendas) : Observable<Vendas>{
    if(vendas.id) {
      return this.httpCliente.put<Vendas>(`${this.vendaURL}/${vendas.id}`, vendas);
    } else {
      return this.httpCliente.post<Vendas>(`${this.vendaURL}`, vendas);
    }
  }

  findVendaById(id : number) : Observable<Vendas> {
    return this.httpCliente.get<Vendas>(`${this.vendaURL}/${id}`);
  }

  deleteVenda(id : number) : Observable<any> {
    return this.httpCliente.delete<any>(`${this.vendaURL}/${id}`);
  }
}
