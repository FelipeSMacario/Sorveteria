import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sorvete } from '../sorvete.model';
import { SorveteService } from '../sorvete.service';

@Component({
  selector: 'app-listar-sorvete',
  templateUrl: './listar-sorvete.component.html',
  styleUrls: ['./listar-sorvete.component.css']
})
export class ListarSorveteComponent implements OnInit {

  sorvete : Sorvete[] = [];

  constructor(
    private sorveteService : SorveteService,
    private router : Router) { }

  ngOnInit(): void {
    this.findAllSorvete();
  }

  findAllSorvete() : void {
    this.sorveteService.findAllSorvete().subscribe({
      next : sorv => this.sorvete = sorv,
      error : err => console.log("Erro", err)
    })
  }

  edit(id : number) {
    this.router.navigate( ["sorvete/novo", id]);
  }

  deleteSorvete(id : number) {
    this.sorveteService.deleteSorvete(id).subscribe({
      next : () => {console.log("Deletado com sucesso"); this.findAllSorvete()},
      error : err => console.log("Erro", err)
    })
  }

}
