import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarFabricanteComponent } from './fabricante/cadastrar-fabricante/cadastrar-fabricante.component';
import { FabricanteComponent } from './fabricante/listar-fabricante/fabricante.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
