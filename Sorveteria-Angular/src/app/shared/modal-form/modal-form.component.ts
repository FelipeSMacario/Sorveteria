import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Sabores } from 'src/app/sabores/sabores.model';

import { SaboresService } from 'src/app/sabores/sabores.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  sabores : Sabores[] = [];

  constructor(
    private bsModalRef : BsModalRef,
    private saboresService : SaboresService
    ) { }

  ngOnInit(): void {
    this.findAllSabores();
  }

  onClose(){
    this.bsModalRef.hide();
  }

  findAllSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => this.sabores = sab,
      error : err => console.log("Erro", err)
    })
  }

}
