import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrillaCursosComponent } from './grilla-cursos/grilla-cursos.component';
import { AgregarCursosComponent } from './agregar-cursos/agregar-cursos.component';
import { ModificarCursosComponent } from './modificar-cursos/modificar-cursos.component';
import { EliminarCursosComponent } from './eliminar-cursos/eliminar-cursos.component';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { MaterialModule } from '../material/material.module';
import { CursosRoutingModule } from './cursos.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import * as fromFeatureCursos from '../Store/Cursos/feature-cursos.reducer'
import { EffectsModule } from '@ngrx/effects';
import { FeatureCursosEffects } from '../Store/Cursos/feature-cursos.effects';
import * as fromFeatureUser from '../Store/AppStore/app-store.reducer';
import { AppStoreEffects } from '../Store/AppStore/app-store.effects';


@NgModule({
  declarations: [
    GrillaCursosComponent,
    AgregarCursosComponent,
    ModificarCursosComponent,
    EliminarCursosComponent,
    DetalleCursosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CursosRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(fromFeatureCursos.featureCursosFeatureKey, fromFeatureCursos.CursosReducer),
    EffectsModule.forFeature([FeatureCursosEffects]),
    StoreModule.forFeature(fromFeatureUser.appStoreFeatureKey, fromFeatureUser.userReducer),
    EffectsModule.forFeature([AppStoreEffects])

  ],
  exports:[
    GrillaCursosComponent,
    AgregarCursosComponent,
    ModificarCursosComponent,
    EliminarCursosComponent,
    DetalleCursosComponent,
    CursosRoutingModule
  ]
})
export class CursosModule { }
