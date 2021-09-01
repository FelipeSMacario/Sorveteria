import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fabricante } from './fabricante.model';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  fabricanteUrl : string = "http://localhost:8080/fabricante";

  constructor(private httpCliente : HttpClient) { }

  findAllFabricantes() : Observable<Fabricante[]> {
    return this.httpCliente.get<Fabricante[]>(`${this.fabricanteUrl}`);
  }

  findFabricanteById(id : number) : Observable<Fabricante> {
    return this.httpCliente.get<Fabricante>(`${this.fabricanteUrl}/${id}`);
  }

  saveFabricante(fabricante : Fabricante) : Observable<Fabricante> {
    if(fabricante.id) {
      return this.httpCliente.put<Fabricante>(`${this.fabricanteUrl}/${fabricante.id}`,fabricante);
    }
    else {
      return this.httpCliente.post<Fabricante>(`${this.fabricanteUrl}`,fabricante);
    }
  }
  deleteFabricante(id : number) : Observable<any> {
    return this.httpCliente.delete<any>(`${this.fabricanteUrl}/${id}`);
  }
}
