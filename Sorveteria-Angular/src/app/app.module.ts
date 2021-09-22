import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FabricanteComponent } from './fabricante/listar-fabricante/fabricante.component';
import { CadastrarFabricanteComponent } from './fabricante/cadastrar-fabricante/cadastrar-fabricante.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarSorveteComponent } from './sorvete/listar-sorvete/listar-sorvete.component';
import { CadastrarSorveteComponent } from './sorvete/cadastrar-sorvete/cadastrar-sorvete.component';
import { ModalComponent } from './shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './shared/home/home.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { ListarSaboresComponent } from './sabores/listar-sabores/listar-sabores.component';
import {MatMenuModule} from '@angular/material/menu';
import { ModalFormComponent } from './shared/modal-form/modal-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { VendaCadastroComponent } from './venda/cadastro-vendas/cadastro-vendas.component';
import { ListarVendasComponent } from './venda/listar-vendas/listar-vendas.component';





@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FabricanteComponent,
    CadastrarFabricanteComponent,
    ListarSorveteComponent,
    CadastrarSorveteComponent,
    ModalComponent,
    HomeComponent,
    AlertModalComponent,
    ListarSaboresComponent,
    ModalFormComponent,
    VendaCadastroComponent,
    ListarVendasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TabsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [BsModalService,
              ModalComponent, 
              BsModalRef, 
              MatNativeDateModule, 
              MatDatepickerModule, 
              ModalFormComponent,             
              { provide: MAT_DATE_LOCALE, useValue: 'pt' }
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
