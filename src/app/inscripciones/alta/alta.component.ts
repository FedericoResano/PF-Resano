import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Cursos } from 'src/app/shared/class/cursos';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';
import { selectAlumnos } from 'src/app/Store/Alumnos/feature-alumnos.selectors';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { selectCursos } from 'src/app/Store/Cursos/feature-cursos.selectors';
import { addInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.actions';


@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  pageTitle: Title ={
    title: 'Inscripción de alumno'
  } ;
  inscripciones: Inscripciones[];
  inscripcion: Inscripciones;
  alumnos: Alumnos[];
  cursos: Cursos[];
  sub: Subscription
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private inscripcionesServicio: InscripcionesService,
    private alumnosServicio: AlumnosService,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  //Recupero la info del usuario 
  usuario:User;


    altaFormGroup: FormGroup = this.formBuilder.group({
      alumno:[''],
      curso:[''],
      fechaInicio:['', Validators.required],
      idAlumno:['', Validators.required],
      idCurso:['', Validators.required],
    })

  ngOnInit(): void {
    this.sub=this.store.select(selectAlumnos).subscribe(
      (val)=>{
        this.alumnos=val;
        
      }
    )

    this.sub=this.store.select(selectCursos).subscribe(
      (val)=>{
        this.cursos=val;
      }
    )
    this.store.dispatch(TitleChange({title: this.pageTitle}));

    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
  }

  //Hago el post para agregar una suscripcion y guardo la suscripcion
  submit(){
    //Cargo los datos del alumno y del curso, para despues poder guardarme el nombre del alumno y del curso.
    var descripcionAlumno = this.alumnos.find(x => x.id ==  this.altaFormGroup.controls["idAlumno"].value)
    var descripcionCurso = this.cursos.find(x => x.id ==  this.altaFormGroup.controls["idCurso"].value)
    this.inscripcion= {
      id: 0,
      idAlumno: this.altaFormGroup.controls["idAlumno"].value,
      curso: descripcionCurso.curso,
      fechaInicio: this.altaFormGroup.controls["fechaInicio"].value,
      idCurso: this.altaFormGroup.controls["idCurso"].value,
      alumno: descripcionAlumno.apellido + ', ' + descripcionAlumno.nombre
    };

    this.store.dispatch(addInscripciones({Inscripcion:this.inscripcion}));
    this.router.navigate(["inscripciones"]);
  }


}
