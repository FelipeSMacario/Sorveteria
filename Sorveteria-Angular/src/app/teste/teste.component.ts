import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Sabores } from '../sabores/sabores.model';
import { SaboresService } from '../sabores/sabores.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css'],
})
export class TesteComponent {
  form: FormGroup;

  sabor : Sabores[] = [];



  constructor(
              private fb: FormBuilder,
              private saboresService : SaboresService) {
    this.form = this.fb.group({
      sabores: new FormArray([])
    });
    this.findAllSabores();
  }

  get saboresArray() {
    return this.form.controls.sabores as FormArray;
  }

  submit() {
    const selectedOrderIds = this.form.value.sabores
      .map((checked, i) => checked ? this.sabor[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }



  findAllSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => {this.sabor = sab; this.sabor.forEach(() => this.saboresArray.push(new FormControl(false)))},
      error : err => console.log("Erro", err)
    })
  }
}
