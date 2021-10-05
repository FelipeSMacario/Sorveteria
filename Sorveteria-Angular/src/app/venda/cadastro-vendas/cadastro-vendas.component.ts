import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sabores } from 'src/app/sabores/sabores.model';
import { SaboresService } from 'src/app/sabores/sabores.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { Sorvete } from 'src/app/sorvete/sorvete.model';
import { SorveteService } from 'src/app/sorvete/sorvete.service';
import { VendaService } from '../venda.service';
import { Vendas } from '../vendas';

@Component({
  selector: 'app-cadastro-vendas',
  templateUrl: './cadastro-vendas.component.html',
  styleUrls: ['./cadastro-vendas.component.css'],
})
export class VendaCadastroComponent implements OnInit {
  cadastro: FormGroup;
  sorvetes: Sorvete[];
  sabores : Sabores[] = []
  id : number;

  constructor(
    private sorveteService: SorveteService,
    private fb: FormBuilder,
    private vendaService : VendaService,
    private activatedRoute : ActivatedRoute,
    private saboresService : SaboresService,
    private modal : ModalService
  ) {}

  ngOnInit(): void {
    this.findSorvete();
    this.findAllSabores();

    this.id = this.activatedRoute.snapshot.params["id"];

    if(this.id){
      
      this.vendaService.findVendaById(this.id).subscribe({
        next : venda => {this.formCheio(venda); console.log(venda)},
        error : err => console.log(err)
      })
    }else {
      this.formVazio();   
    }

    this.cadastro = this.fb.group({
      id : [null],
      sorvete: [null, [Validators.required]],
      sabores: [null, [Validators.required]],
      qtdItemVenda: [null, [Validators.required, Validators.min(1), Validators.max(10000)]],
      qtdValorVenda: [null, [Validators.required]],
    });
  }

  formVazio(){
    this.cadastro = this.fb.group({
      id : [null],
      sorvete: [null, [Validators.required]],
      sabores: [null, [Validators.required]],
      qtdItemVenda: [null, [Validators.required]],
      qtdValorVenda: [null, [Validators.required]],
    });
  }

  formCheio(vendas : Vendas){
    this.cadastro = this.fb.group({
      id :[ vendas.id],
      sorvete : [vendas.sorvete],
      sabores : [vendas.sabores],
      qtdItemVenda : [vendas.qtdItemVenda],
      qtdValorVenda : [vendas.qtdValorVenda]
    });
  }

  findSorvete() {
    this.sorveteService.findAllSorvete().subscribe({
      next: (sorv) => (this.sorvetes = sorv),
      error: (err) => console.log(err),
    });
  }

  findAllSabores() : void {
    this.saboresService.findAllSabores().subscribe({
      next : sab => this.sabores = sab,
      error : err => console.log("Erro", err)
    })
  }

  ngOnChange() {
    if (this.cadastro.value.sorvete == null) {
      var valor = 0;
    } else {
      valor = this.cadastro.value.sorvete.valor;
    }

    if (this.cadastro.value.qtdItemVenda == null) {
      var valor2 = 0;
    } else {
      valor2 = this.cadastro.value.qtdItemVenda;
    }

    this.cadastro.controls.qtdValorVenda.setValue(valor * valor2);
  }

  saveVendas(){
    this.vendaService.saveVendas(this.cadastro.value).subscribe({
      next : (vendas) => { this.modal.handleMessage(
        'Venda cadastrada com sucesso',
        'success'
      );console.log("Cadastrado com sucesso", vendas); this.cadastro.reset()},
      error : err => this.modal.handleMessage(
        'Erro ao cadastrar a venda',
        'danger')
    })
  }

  atualizaSabor(id ){
    this.cadastro.controls.sabores.setValue(null);
    this.sabores = [];
    let valor = id;
    valor.forEach(v => this.sabores.push(v))
  }

  compararSorvete(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 && obj2;
  }

  compararSabores(obj3: any, obj4: any) {
    return obj3 && obj4 ? obj3.id === obj4.id : obj3 && obj4;
  }
}
