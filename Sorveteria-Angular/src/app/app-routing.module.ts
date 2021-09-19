import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarFabricanteComponent } from './fabricante/cadastrar-fabricante/cadastrar-fabricante.component';
import { FabricanteComponent } from './fabricante/listar-fabricante/fabricante.component';
import { ListarSaboresComponent } from './sabores/listar-sabores/listar-sabores.component';
import { CadastrarSorveteComponent } from './sorvete/cadastrar-sorvete/cadastrar-sorvete.component';
import { ListarSorveteComponent } from './sorvete/listar-sorvete/listar-sorvete.component';
import { TesteComponent } from './teste/teste.component';
import { Teste2Component } from './teste2/teste2.component';

const routes: Routes = [
  {
    path : "", redirectTo: 'fabricante', pathMatch: 'full'
  },
  {
    path : "fabricante",
    component : FabricanteComponent
  },
  {
    path : "fabricante/novo",
    component : CadastrarFabricanteComponent
  },
  {
    path : "fabricante/novo/:id",
    component : CadastrarFabricanteComponent
  },
  {
    path : "sorvete",
    component : ListarSorveteComponent
  },
  {
    path : "sorvete/novo",
    component : CadastrarSorveteComponent
  },
  {
    path : "sorvete/novo/:id",
    component : CadastrarSorveteComponent
  },
  {
    path : "sabores",
    component : ListarSaboresComponent
  },
  {
    path : "teste",
    component : TesteComponent
  },
  {
    path : "teste2",
    component : Teste2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
