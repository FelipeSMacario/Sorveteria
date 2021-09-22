import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ModalFormComponent } from 'src/app/shared/modal-form/modal-form.component';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sabores } from '../sabores.model';
import { SaboresService } from '../sabores.service';


@Component({
  selector: 'app-cadastrar-sabores',
  templateUrl: './listar-sabores.component.html',
  styleUrls: ['./listar-sabores.component.css']
})
export class ListarSaboresComponent implements OnInit {

  sabores : Sabores[] = [];
  form : string = "formSabor";
  formSabor : FormGroup;
  teste : number;
  

  constructor(
    private saboresService : SaboresService,
    private modalService : ModalService,
  ) { }

  ngOnInit(): void {
    this.findAllSabores();    
  }

  editSabor(id : number){
   
  }

  findAllSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => this.sabores = sab,
      error : err => console.log("Erro", err)
    })
  }



  criarSabor() {
      this.modalService.criarModal(this.form); 
  }

  modalDelete(sab : Sabores){
    const result$ = this.modalService.showConfirm("Confirma exclusão", "Deseja excluir permanentemente o sabor?", "Confirmar", "Cancelar", "danger" );
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.saboresService.deleteSabores(sab.id) : EMPTY)
    ).subscribe(
      sucess => {this.modalService.handleMessage("Sorvete excluído com sucesso", "success"); this.findAllSabores()},
      error => this.modalService.handleMessage("Erro ao excluir o sorvete, tente novamente mais tarde", "danger")
      )
  
    }
}
