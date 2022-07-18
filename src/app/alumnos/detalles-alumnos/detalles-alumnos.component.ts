import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';
import { getAlumnos, getAlumnosSuccess } from 'src/app/Store/Alumnos/feature-alumnos.actions';
import { selectAlumno, selectAlumnosList } from 'src/app/Store/Alumnos/feature-alumnos.selectors';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { deleteInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.actions';
import { selectInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.selectors';

@Component({
  selector: 'app-detalles-alumnos',
  templateUrl: './detalles-alumnos.component.html',
  styleUrls: ['./detalles-alumnos.component.scss']
})
export class DetallesAlumnosComponent implements OnInit, OnDestroy {


  pageTitle: Title = {
    title: 'Detalle de Alumno'
  };
  alumno: Alumnos;
  id: number;
  errorMessage: '';
  sub: Subscription;
  inscripciones: Inscripciones[];
  displayedColumns: string[] = ['inscripciones', 'accion'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private inscripcionesServicio: InscripcionesService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  //Recupero la info del usuario 
  usuario: User;

  detalleFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: [new Date(), Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],

  })

  ngOnInit(): void {

    //guardo la suscripcion y cargo el form con los datos

    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    });

    //Hago el load de alumno
    this.onGet();

    //Cargo la info del alumno en el formulario
    this.sub = this.store.select(selectAlumno).subscribe(
      (val) => {
        this.alumno = val;
        this.detalleFormGroup.patchValue(val);
        this.detalleFormGroup.disable();
        this.inscripciones = this.performFilter(this.id);
      }
    )

    //Cargo el titulo del componente
    this.store.dispatch(TitleChange({ title: this.pageTitle }));
    
    //Recupero la info del usuario 
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }

  submit() {
    this.router.navigate(["alumnos"]);
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //Me traigo los cursos a los que esta inscripto el alumno y luego lo cargo en el OnInit
  performFilter(IdAlumno: number): Inscripciones[] {

    this.sub = this.store.select(selectInscripciones).subscribe({
      next: Inscripciones => {
        this.inscripciones = Inscripciones.filter((inscripcion: Inscripciones) =>
          inscripcion.idAlumno == IdAlumno);
      },
      error: err => this.errorMessage = err,
    });

    return this.inscripciones

  }

  //Posta para eliminar la inscripción del alumno a un curso
  desinscribirAlumno(id: number) {
    
    this.store.dispatch(deleteInscripciones({ id: id }));
    this.router.navigate(["inscripciones"])

  }

  onGet() {
    this.store.dispatch(getAlumnos({ id: this.id }))
  }
}

