import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { CoreRoutingModule } from './core.routing.module';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromFeatureUser from '../Store/AppStore/app-store.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AppStoreEffects } from '../Store/AppStore/app-store.effects';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginComponent,
    ToolbarComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    StoreModule.forFeature(fromFeatureUser.appStoreFeatureKey, fromFeatureUser.userReducer),
    EffectsModule.forFeature([AppStoreEffects])

  ],
  exports:[
    SidebarComponent,
    LoginComponent,
    ToolbarComponent,
    InicioComponent,
    CoreRoutingModule
  ]
})
export class CoreModule { }
