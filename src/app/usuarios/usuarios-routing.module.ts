import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChildGuard } from '../shared/Guards/auth-child.guard';
import { AuthGuard } from '../shared/Guards/auth.guard';
import { AltaComponent } from './alta/alta.component';
import { BajaComponent } from './baja/baja.component';
import { GrillaUsuariosComponent } from './grilla-usuarios/grilla-usuarios.component';
import { ModificarComponent } from './modificar/modificar.component';




const routes: Routes =[
  {
    path: '',
    canActivate: [AuthGuard],
    component: GrillaUsuariosComponent
  },
  {
      path:'alta',
      canActivate: [AuthChildGuard],
      component: AltaComponent
  },
  {
      path:'baja/:id',
      canActivate: [AuthChildGuard],
      component: BajaComponent
  },
  {
    path:'editar/:id',
    canActivate: [AuthChildGuard],
    component: ModificarComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsuariosRoutingModule {}