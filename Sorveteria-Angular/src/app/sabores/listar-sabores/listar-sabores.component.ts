import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sabores } from '../sabores.model';
import { SaboresService } from '../sabores.service';

@Component({
  selector: 'app-cadastrar-sabores',
  templateUrl: './listar-sabores.component.html',
  styleUrls: ['./listar-sabores.component.css'],
})
export class ListarSaboresComponent implements OnInit {
  sabores: Sabores[] = [];

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  cadastro: FormGroup;

  constructor(
    private saboresService: SaboresService,
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.findAllSabores();

    this.cadastro = this.fb.group({
      nome: [null],
    });
  }
  findAllSabores(): void {
    this.saboresService.findAllSabores().subscribe({
      next: (sab) => (this.sabores = sab),
      error: (err) => console.log('Erro', err),
    });
  }

  edit(id: number) {
    this.router.navigate(['sabores/novo', id]);
  }

  modalDelete(sab: Sabores) {
    const result$ = this.modalService.showConfirm(
      'Confirma exclusão',
      'Deseja excluir permanentemente o sabor?',
      'Confirmar',
      'Cancelar',
      'danger'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.saboresService.deleteSabores(sab.id) : EMPTY
        )
      )
      .subscribe(
        (sucess) => {
          this.modalService.handleMessage(
            'Sorvete excluído com sucesso',
            'success'
          );
          this.findAllSabores();
        },
        (error) =>
          this.modalService.handleMessage(
            'Erro ao excluir o sorvete, tente novamente mais tarde',
            'danger'
          )
      );
  }

  onTableDataChange(event) {
    this.page = event;
    this.findAllSabores();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.findAllSabores();
  }

  filtrar() {
    if (this.cadastro.value.nome != null) {
      this.saboresService
        .findSaboresByNome(this.cadastro.value.nome)
        .subscribe({
          next: (valor) => {
            this.sabores = valor;
            this.cadastro.reset();
          },
          error: (err) => console.log(err),
        });
    }
  }

  limpar() {
    this.cadastro.reset();
    this.findAllSabores();
  }
}
