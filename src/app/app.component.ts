import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadFeatureAlumnoss } from './Store/Alumnos/feature-alumnos.actions';
import { loadFeatureCursos } from './Store/Cursos/feature-cursos.actions';
import { loadFeatureInscripciones } from './Store/Inscripciones/feature-inscripciones.actions';
import { loadUsuariosFeature } from './Store/Usuarios/usuarios-feature.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PF-Resano';
  constructor(private store:Store<any>){}


ngOnInit(){
 this.store.dispatch(loadFeatureAlumnoss())
 this.store.dispatch(loadFeatureCursos())
 this.store.dispatch(loadFeatureInscripciones())
 this.store.dispatch(loadUsuariosFeature())
}
}


