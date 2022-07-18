import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrillaInscripcionesComponent } from './grilla-inscripciones/grilla-inscripciones.component';
import { AltaComponent } from './alta/alta.component';
import { BajaComponent } from './baja/baja.component';
import { InscripcionesRoutingModule } from './inscripciones.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromFeatureInscripciones from '../Store/Inscripciones/feature-inscripciones.reducer'
import { EffectsModule } from '@ngrx/effects';
import { FeatureInscripcionesEffects } from '../Store/Inscripciones/feature-inscripciones.effects';



@NgModule({
  declarations: [
    GrillaInscripcionesComponent,
    AltaComponent,
    BajaComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature(fromFeatureInscripciones.featureInscripcionesFeatureKey, fromFeatureInscripciones.InscripcionesReducer),
    EffectsModule.forFeature([FeatureInscripcionesEffects])
  ],
  exports:[
    GrillaInscripcionesComponent,
    AltaComponent,
    BajaComponent,
    InscripcionesRoutingModule
  ]
})
export class InscripcionesModule { }
