import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
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
    private router : Router,
    private modalService : ModalService)
     { }

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

  modalDelete(sorvete : Sorvete) {
    const result$ = this.modalService.showConfirm("Confirmar exclusão", "Deseja excluir o sorvete?");
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.sorveteService.deleteSorvete(sorvete.id) : EMPTY)
    ).subscribe(
      sucess => {console.log("Deletado com sucesso"); this.findAllSorvete()},
      error  => console.log("Erro", error)
    )
  }

}
