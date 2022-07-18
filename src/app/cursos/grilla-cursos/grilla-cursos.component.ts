import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cursos } from 'src/app/shared/class/cursos';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCursos } from 'src/app/Store/Cursos/feature-cursos.selectors';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { Title } from 'src/app/shared/class/title';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { User } from 'src/app/shared/class/user';


@Component({
  selector: 'app-grilla-cursos',
  templateUrl: './grilla-cursos.component.html',
  styleUrls: ['./grilla-cursos.component.scss']
})
export class GrillaCursosComponent implements OnInit, OnDestroy {
  cursos: Cursos[];

  errorMessage = '';
  sub: Subscription
  pageTitle: Title = {
    title: 'Listado de Cursos'
  };
  displayedColumns: string[] = ['curso', 'duracion', 'precio', 'accion'];
  constructor(private serviceCursos: CursosService, private store: Store<any>) { };

  //Recupero la info del usuario 
  usuario:User;

  ngOnInit(): void {

    //GUardo la suscripcion y lleno la variable para la grilla
    this.sub = this.store.select(selectCursos).subscribe(
      (val) => {
        this.cursos = val;

      }
    )

    this.store.dispatch(TitleChange({ title: this.pageTitle }));

    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}