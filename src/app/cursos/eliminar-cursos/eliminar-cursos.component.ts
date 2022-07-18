import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/shared/class/cursos';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { deleteCursos, getCursos } from 'src/app/Store/Cursos/feature-cursos.actions';
import { selectCurso } from 'src/app/Store/Cursos/feature-cursos.selectors';

@Component({
  selector: 'app-eliminar-cursos',
  templateUrl: './eliminar-cursos.component.html',
  styleUrls: ['./eliminar-cursos.component.scss']
})
export class EliminarCursosComponent implements OnInit, OnDestroy {

  pageTitle: Title = {
    title: 'Eliminar Curso'
  };

  //Genero la propiedad alumno para el get y alumnos para volver a cargar la lista
  curso: Cursos
  cursos: Cursos[];
  id: number;
  sub: Subscription;
  errorMessage = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  //Recupero la info del usuario 
  usuario: User;


  eliminarFormGroup: FormGroup = this.formBuilder.group({
    curso: ['', [Validators.required, Validators.maxLength(50)]],
    duracion: ['', [Validators.required, Validators.maxLength(50)]],
    precio: ['', [Validators.required]],
  })

  ngOnInit(): void {
    //Llamo al get del servicio para que me cargue los datos en el formulario y aca cargo el id en una variable para luego pasarla en le post.
    //Guardo la suscripcion
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.store.select(selectLoginUser).subscribe(
        (val) => this.usuario = val
      )
    })

    this.onGet();
    this.sub = this.store.select(selectCurso).subscribe(
      (val) => {
        this.curso = val;
        this.eliminarFormGroup.patchValue(val);
        this.eliminarFormGroup.disable();
      }
    )
    this.store.dispatch(TitleChange({ title: this.pageTitle }));
  }
  //Envio el id del curso a eliminar y regenero la propiedad cursos[] para tenerla actuaizada. Redirijo a la lista de cursos
  submit() {
    this.store.dispatch(deleteCursos({ id: this.id }));
    this.router.navigate(["/cursos"]);

  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGet() {
    this.store.dispatch(getCursos({ id: this.id }))
  }

}