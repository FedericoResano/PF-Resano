import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { selectInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.selectors';


@Component({
  selector: 'app-grilla-inscripciones',
  templateUrl: './grilla-inscripciones.component.html',
  styleUrls: ['./grilla-inscripciones.component.scss']
})
export class GrillaInscripcionesComponent implements OnInit, OnDestroy {
  usuario:User;
  inscripciones: Inscripciones[];
  pageTitle: Title ={
    title: 'Listado de Inscripciones'
  } ;
  errorMessage = '';
  sub: Subscription

  displayedColumns: string[] = ['alumno', 'curso', 'fechaInicio', 'accion'];
  constructor(private serviceCursos: InscripcionesService,
              private store:Store<any>) { };


  //Guardo la sub y traigo los datos para armar la tabla.
  ngOnInit(): void {
    
    this.sub=this.store.select(selectInscripciones).subscribe(
      (val)=>{
        this.inscripciones=val; 
      }
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}