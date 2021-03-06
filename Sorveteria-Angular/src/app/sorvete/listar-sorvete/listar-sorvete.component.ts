import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sorvete } from '../sorvete.model';
import { SorveteService } from '../sorvete.service';

@Component({
  selector: 'app-listar-sorvete',
  templateUrl: './listar-sorvete.component.html',
  styleUrls: ['./listar-sorvete.component.css'],
})
export class ListarSorveteComponent implements OnInit {
  cadastro: FormGroup;

  sorvete: Sorvete[] = [];
  sorveteFiltrado: Sorvete[] = [];

  constructor(
    private sorveteService: SorveteService,
    private router: Router,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAllSorvete();

    this.cadastro = this.fb.group({
      nome: [null],
    });
  }

  findAllSorvete(): void {
    this.sorveteService.findAllSorvete().subscribe({
      next: (sorv) => (this.sorvete = sorv),
      error: (err) => console.log('Erro', err),
    });
  }

  edit(id: number) {
    this.router.navigate(['sorvete/novo', id]);
  }

  modalDelete(sorvete: Sorvete) {
    const result$ = this.modalService.showConfirm(
      'Confirmar exclusão',
      'Deseja excluir o sorvete?',
      'Confirmar',
      'Cancelar',
      'danger'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.sorveteService.deleteSorvete(sorvete.id) : EMPTY
        )
      )
      .subscribe(
        (sucess) => {
          this.modalService.handleMessage(
            'Sorvete excluído com sucesso',
            'success'
          );
          this.findAllSorvete();
        },
        (error) => {
          this.modalService.handleMessage(
            'Erro ao eccluir o sorvete, tente novamente mais tarde',
            'danger'
          );
          console.log('Erro', error);
        }
      );
  }

  filtrar() {
    if (this.cadastro.value.nome != null) {
      this.sorveteService
        .findSorveteByNome(this.cadastro.value.nome)
        .subscribe({
          next: (valor) => {
            this.sorvete = valor;
            this.cadastro.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  limpar() {
    this.cadastro.reset();
    this.findAllSorvete();
  }
}
