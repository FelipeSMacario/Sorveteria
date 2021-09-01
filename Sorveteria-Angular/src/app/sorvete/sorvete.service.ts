import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sorvete } from './sorvete.model';

@Injectable({
  providedIn: 'root',
})
export class SorveteService {
  sorveteUrl: string = 'http://localhost:8080/sorvete';

  constructor(private httpClient: HttpClient) {}

  findAllSorvete(): Observable<Sorvete[]> {
    return this.httpClient.get<Sorvete[]>(`${this.sorveteUrl}`);
  }

  findSorveteById(id: number): Observable<Sorvete> {
    return this.httpClient.get<Sorvete>(`${this.sorveteUrl}/${id}`);
  }

  saveSorvete(sorvete : Sorvete) : Observable<Sorvete> {
    if(sorvete.id) 
    return this.httpClient.put<Sorvete>(`${this.sorveteUrl}/${sorvete.id}`, sorvete);
    else 
    return this.httpClient.post<Sorvete>(`${this.sorveteUrl}`,sorvete);
  }

  deleteSorvete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.sorveteUrl}/${id}`);
  }
}
