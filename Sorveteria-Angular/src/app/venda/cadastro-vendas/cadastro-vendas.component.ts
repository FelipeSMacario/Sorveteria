import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sabores } from 'src/app/sabores/sabores.model';
import { Sorvete } from 'src/app/sorvete/sorvete.model';
import { SorveteService } from 'src/app/sorvete/sorvete.service';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-cadastro-vendas',
  templateUrl: './cadastro-vendas.component.html',
  styleUrls: ['./cadastro-vendas.component.css'],
})
export class VendaCadastroComponent implements OnInit {
  cadastro: FormGroup;
  sorvetes: Sorvete[];
  sabores : Sabores[] = []

  constructor(
    private sorveteService: SorveteService,
    private fb: FormBuilder,
    private vendaService : VendaService
  ) {}

  ngOnInit(): void {
    this.findSorvete();

    this.cadastro = this.fb.group({
      sorvete: [null, [Validators.required]],
      sabores: [null, [Validators.required]],
      qtdItemVenda: [null, [Validators.required]],
      qtdValorVenda: [null, [Validators.required]],
    });
  }

  findSorvete() {
    this.sorveteService.findAllSorvete().subscribe({
      next: (sorv) => (this.sorvetes = sorv),
      error: (err) => console.log(err),
    });
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
      next : (vendas) => {console.log("Cadastrado com sucesso", vendas); this.cadastro.reset()},
      error : err => console.log("ERRO", err)
    })
  }

  atualizaSabor(id ){
    this.cadastro.controls.sabores.setValue(null);
    this.sabores = [];
    let valor = id;
    valor.forEach(v => this.sabores.push(v))

  }
}
