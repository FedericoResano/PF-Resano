import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { loadFeatureAlumnoss, loadFeatureAlumnossSuccess } from 'src/app/Store/Alumnos/feature-alumnos.actions';
import { selectAlumnos, selectAlumnosList } from 'src/app/Store/Alumnos/feature-alumnos.selectors';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';


@Component({
  selector: 'app-grilla-alumnos',
  templateUrl: './grilla-alumnos.component.html',
  styleUrls: ['./grilla-alumnos.component.scss']
})
export class GrillaAlumnosComponent implements OnInit, OnDestroy {

  alumnos: Alumnos[];
  pageTitle: Title ={
    title: 'Listado de Alumnos'
  } ;
  errorMessage = '';
  sub: Subscription;
  loading:boolean;
  usuario:User;

  displayedColumns: string[] = ['alumnoNombre', 'alumnoCurso', 'alumnoMail', 'accion'];
  constructor(private store: Store<any>) {};

  ngOnInit(): void {

    //Traigo la info de los alumnos
    this.sub=this.store.select(selectAlumnos).subscribe(
      (val)=>{
        this.alumnos=val;
        
      }
    )

    //Cargo el titulo del componente
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
