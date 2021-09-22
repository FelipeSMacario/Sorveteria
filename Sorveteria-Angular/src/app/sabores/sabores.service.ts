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

  findSaboresById(id : number) : Observable<Sabores> {
    return this.httpCliente.get<Sabores>(`${this.urlSabor}/${id}`)
  }

  createSabores(sabores: Sabores): Observable<Sabores> {
    return this.httpCliente.post<Sabores>(`${this.urlSabor}`, sabores);
  }

  deleteSabores(id: number): Observable<any> {
    return this.httpCliente.delete<any>(`${this.urlSabor}/${id}`);
  }
}
