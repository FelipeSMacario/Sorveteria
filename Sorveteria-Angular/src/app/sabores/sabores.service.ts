import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sabores } from './sabores.model';


@Injectable({
  providedIn: 'root'
})
export class SaboresService {

  private urlSabor : string = "http://localhost:8080/sabores"

  constructor(private httpCliente : HttpClient) { }

  findAllSabores() : Observable<Sabores[]>{
    return this.httpCliente.get<Sabores[]>(`${this.urlSabor}`);
  }
}
