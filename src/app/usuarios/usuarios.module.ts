import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrillaUsuariosComponent } from './grilla-usuarios/grilla-usuarios.component';
import { AltaComponent } from './alta/alta.component';
import { BajaComponent } from './baja/baja.component';
import { ModificarComponent } from './modificar/modificar.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromFeatureUsuarios from '../Store/Usuarios/usuarios-feature.reducer'
import { EffectsModule } from '@ngrx/effects';
import { UsuariosFeatureEffects } from '../Store/Usuarios/usuarios-feature.effects';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosRoutingModule } from './usuarios-routing.module';





@NgModule({
  declarations: [
    GrillaUsuariosComponent,
    AltaComponent,
    BajaComponent,
    ModificarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    UsuariosRoutingModule,
    StoreModule.forFeature(fromFeatureUsuarios.UsuariosFeatureKey, fromFeatureUsuarios.UsuariosReducer),
    EffectsModule.forFeature([UsuariosFeatureEffects])
  ],
  exports:[
    GrillaUsuariosComponent,
    AltaComponent,
    BajaComponent,
    ModificarComponent,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
