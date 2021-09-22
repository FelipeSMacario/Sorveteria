import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ListarSaboresComponent } from 'src/app/sabores/listar-sabores/listar-sabores.component';
import { Sabores } from 'src/app/sabores/sabores.model';

import { SaboresService } from 'src/app/sabores/sabores.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  modal : FormGroup;
  

  constructor(
    private bsModalRef : BsModalRef,
    private saboresService : SaboresService,
    private fb : FormBuilder
    ) { }

  ngOnInit(): void {
   this.modal = this.fb.group({
    id : [null],
    nome : [null]
   }) 
    
  }

  onClose(){
    this.bsModalRef.hide();
  }

  salvar() {
    this.saboresService.createSabores(this.modal.value).subscribe({
      next: modal => console.log('Saved with success', modal),
      error: err => console.log('Error', err)
    })
    this.bsModalRef.hide();
    window.location.reload();
  }

}
