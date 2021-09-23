import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarFabricanteComponent } from './fabricante/cadastrar-fabricante/cadastrar-fabricante.component';
import { FabricanteComponent } from './fabricante/listar-fabricante/fabricante.component';
import { CadastrarSaboresComponent } from './sabores/cadastrar-sabores/cadastrar-sabores.component';
import { ListarSaboresComponent } from './sabores/listar-sabores/listar-sabores.component';
import { CadastrarSorveteComponent } from './sorvete/cadastrar-sorvete/cadastrar-sorvete.component';
import { ListarSorveteComponent } from './sorvete/listar-sorvete/listar-sorvete.component';
import { VendaCadastroComponent } from './venda/cadastro-vendas/cadastro-vendas.component';
import { ListarVendasComponent } from './venda/listar-vendas/listar-vendas.component';

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
    path : "sabores/novo",
    component : CadastrarSaboresComponent
  },
  {
    path : "sabores/novo/:id",
    component : CadastrarSaboresComponent
  },
  {
    path : "vendas",
    component : ListarVendasComponent
  },
  {
    path : "vendas/novo",
    component : VendaCadastroComponent
  },
  {
    path : "vendas/novo/:id",
    component : VendaCadastroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
