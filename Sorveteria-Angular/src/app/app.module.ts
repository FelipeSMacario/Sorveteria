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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HomeComponent } from './shared/home/home.component';
import { DatePickeComponent } from './shared/date-picke/date-picke.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




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
    DatePickeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule, 
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [BsModalService,
              ModalComponent, 
              BsModalRef, 
              MatNativeDateModule, 
              MatDatepickerModule,   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
