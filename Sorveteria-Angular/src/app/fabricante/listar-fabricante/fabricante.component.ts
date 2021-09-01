import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fabricante } from '../fabricante.model';
import { FabricanteService } from '../fabricante.service';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.css'],
})
export class FabricanteComponent implements OnInit {
  fabricantes: Fabricante[] = [];

  constructor(
    private fabricanteService: FabricanteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findAllFabricantes();
  }

  findAllFabricantes(): void {
    this.fabricanteService.findAllFabricantes().subscribe({
      next: (fabri) => (this.fabricantes = fabri),
      error: (err) => console.log('Erro', err),
    });
  }

  edit(id: number) {
    this.router.navigate(['fabricante/novo', id]);
  }

  deleteFabricante(id : number) {
    this.fabricanteService.deleteFabricante(id).subscribe({
      next : () => {console.log("Deletado com sucesso!"); this.findAllFabricantes()},
      error : err => console.log("Erro", err)
    })
  }
}
