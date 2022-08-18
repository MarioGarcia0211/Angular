import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReservasComponent } from 'src/app/components/reservas/list-reservas/list-reservas.component';
import { InicioComponent } from '../inicio/inicio.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ReservacionComponent } from '../reservacion/reservacion.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children:[
    {path: '', redirectTo:'inicio', pathMatch:'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'reservacion', component: ReservacionComponent},
    {path: 'perfil', component: PerfilComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
