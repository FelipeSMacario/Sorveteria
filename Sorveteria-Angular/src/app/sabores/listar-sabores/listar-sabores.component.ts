import { Component, OnInit } from '@angular/core';
import { Sabores } from '../sabores.model';
import { SaboresService } from '../sabores.service';


@Component({
  selector: 'app-cadastrar-sabores',
  templateUrl: './listar-sabores.component.html',
  styleUrls: ['./listar-sabores.component.css']
})
export class ListarSaboresComponent implements OnInit {

  sabores : Sabores[] = [];

  constructor(
    private saboresService : SaboresService
  ) { }

  ngOnInit(): void {
    this.findAllSabores();
    
  }

  findAllSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => this.sabores = sab,
      error : err => console.log("Erro", err)
    })
  }

}
