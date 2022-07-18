import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { FechaPipe } from 'src/app/shared/pipes/fecha.pipe';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { deleteAlumnos, getAlumnos } from 'src/app/Store/Alumnos/feature-alumnos.actions';
import { selectAlumno, selectAlumnosList } from 'src/app/Store/Alumnos/feature-alumnos.selectors';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';



@Component({
  selector: 'app-eliminar-alumnos',
  templateUrl: './eliminar-alumnos.component.html',
  styleUrls: ['./eliminar-alumnos.component.scss']
})
export class EliminarAlumnosComponent implements OnInit, OnDestroy {

  pageTitle: Title = {
    title: 'Eliminar Alumno'
  };

  //Genero la propiedad alumno para el get y alumnos para volver a cargar la lista
  alumno: Alumnos
  alumnos: Alumnos[];
  id: number;
  pipeFecha: FechaPipe = new FechaPipe();
  errorMessage = '';
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  
  usuario:User;


  eliminarFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],
  })

  ngOnInit(): void {

    //Llamo al get del servicio para que me cargue los datos en el formulario y aca cargo el id en una variable para luego pasarla en le post.

    //Cargo la suscripcion    
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })

    //Hago el load de Alumno y lo cargo en el formulario
    this.onGet();
    this.sub = this.store.select(selectAlumno).subscribe(
      (val) => {
        this.alumno = val;
        this.eliminarFormGroup.patchValue(val);
        this.eliminarFormGroup.disable();
      }
    )

    //Cargo el titulo del componente
    this.store.dispatch(TitleChange({ title: this.pageTitle }));

    //Recupero la info del usuario 
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }
  //Envio la el id del alumno a eliminar y regenero la propiedad alumnos[] para tenerla actuaizada. Redirijo a la lista de alumnos
  submit() {
    this.store.dispatch(deleteAlumnos({ id: this.id }));
    this.router.navigate(["/alumnos"]);

  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGet() {
    this.store.dispatch(getAlumnos({ id: this.id }))
  }
}

