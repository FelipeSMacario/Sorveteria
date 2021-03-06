import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sabores } from './sabores.model';

@Injectable({
  providedIn: 'root',
})
export class SaboresService {
  private urlSabor: string = 'http://localhost:8080/sabores';

  constructor(private httpCliente: HttpClient) {}

  findAllSabores(): Observable<Sabores[]> {
    return this.httpCliente.get<Sabores[]>(`${this.urlSabor}`);
  }

  findSaboresByNome(nome : string) : Observable<Sabores[]>{
    return this.httpCliente.get<Sabores[]>(`${this.urlSabor}/search?nome=${nome}`)
  }

  findSaboresById(id : number) : Observable<Sabores> {
    return this.httpCliente.get<Sabores>(`${this.urlSabor}/${id}`)
  }

  saveSabores(sabores: Sabores): Observable<Sabores> {
    if(sabores.id){
      return this.httpCliente.put<Sabores>(`${this.urlSabor}/${sabores.id}`, sabores)
    }
    else {
    return this.httpCliente.post<Sabores>(`${this.urlSabor}`, sabores);
    }
  }

  deleteSabores(id: number): Observable<any> {
    return this.httpCliente.delete<any>(`${this.urlSabor}/${id}`);
  }
}
