import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Sabores } from '../sabores/sabores.model';
import { SaboresService } from '../sabores/sabores.service';
import { Sorvete } from '../sorvete/sorvete.model';
import { SorveteService } from '../sorvete/sorvete.service';

@Component({
  selector: 'app-teste2',
  templateUrl: './teste2.component.html',
  styleUrls: ['./teste2.component.css']
})
export class Teste2Component implements OnInit {

  form : FormGroup;

  sorvete : Sorvete;

  sabor : Sabores[] = [];

  constructor(
              private fb : FormBuilder,
              private sorveteService : SorveteService,
              private saboresService : SaboresService) { }

  ngOnInit(): void {

    this.listarSabores();

    this.form = this.fb.group({
      nome : [null],
      valorFabrica : [null],
      sabores: this.fb.array([])
    })
  }

  get arraySabor() {
    return this.form.controls.sabores as FormArray;
  }

  saveSorvete() : void {
    this.sorveteService.saveSorvete(this.form.value).subscribe({
      next : (sorvete) => console.log('Cadastrado com sucesso', sorvete),
      error : erro => console.log("erro", erro)
    })
  }

  listarSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => {this.sabor = sab; this.sabor.forEach(() => this.arraySabor.push(new FormControl(false)))},
      error : err =>  console.error("Erro", err)
      
    })
  }

  submit()  {
      this.form.value.sabores = this.form.value.sabores
      .map((checked, i) => checked ? this.sabor[i] : null)
      .filter(v => v !== null);
      
      
      this.saveSorvete();
    
  }

}
