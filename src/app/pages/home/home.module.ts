import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { SidenavComponent } from 'src/app/shared/components/sidenav/sidenav.component';
import { ReservacionComponent } from '../reservacion/reservacion.component';
import { InicioComponent } from '../inicio/inicio.component';
import { NewReservaComponent } from 'src/app/components/reservas/new-reserva/new-reserva.component';
import { ListReservasComponent } from 'src/app/components/reservas/list-reservas/list-reservas.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { PerfilComponent } from '../perfil/perfil.component';


@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    ReservacionComponent,
    InicioComponent,
    NewReservaComponent,
    ListReservasComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
  ]
})
export class HomeModule { }
