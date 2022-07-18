import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/shared/class/cursos';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { getCursos } from 'src/app/Store/Cursos/feature-cursos.actions';
import { selectCurso } from 'src/app/Store/Cursos/feature-cursos.selectors';
import { deleteInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.actions';
import { selectInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.selectors';

@Component({
  selector: 'app-detalle-cursos',
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.scss']
})
export class DetalleCursosComponent implements OnInit, OnDestroy {



  pageTitle: Title = {
    title: 'Detalle de Curso'
  };
  curso: Cursos;
  id: number;
  errorMessage = '';
  sub: Subscription;
  inscripciones: Inscripciones[];
  inscripcion: Inscripciones;
  usuario: User;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private inscripcionesServicio: InscripcionesService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  displayedColumns: string[] = ['inscripciones', 'accion'];


  detalleFormGroup: FormGroup = this.formBuilder.group({
    curso: ['', [Validators.required, Validators.maxLength(50)]],
    duracion: ['', [Validators.required, Validators.maxLength(50)]],
    precio: ['', [Validators.required]],

  })

  ngOnInit(): void {

    //Guardo la suscripcion, lleno la variable de cursos y completo el formulario, y lleno la variable de inscripciones, mandando el id del curso.
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })

    this.onGet();
    this.sub = this.store.select(selectCurso).subscribe(
      (val) => {
        this.curso = val;
        this.detalleFormGroup.patchValue(val);
        this.detalleFormGroup.disable();
        this.inscripciones = this.performFilter(this.id);
      }
    )

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({ title: this.pageTitle }));
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //Filtro las inscripciones a partir del id del curso
  performFilter(IdCurso: number): Inscripciones[] {

    this.sub = this.store.select(selectInscripciones).subscribe({
      next: Inscripciones => {
        this.inscripciones = Inscripciones.filter((inscripcion: Inscripciones) =>
          inscripcion.idCurso == IdCurso);
      },
      error: err => this.errorMessage = err,
    });

    return this.inscripciones

  }

  submit() {
    this.router.navigate(["/cursos"]);
  }

  //post para eliminar la inscripcion
  desinscribirAlumno(id: number) {
    this.store.dispatch(deleteInscripciones({ id: id }));

    this.router.navigate(["inscripciones"])

  }

  onGet() {
    this.store.dispatch(getCursos({ id: this.id }))
  }

}