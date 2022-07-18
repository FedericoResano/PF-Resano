import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { deleteInscripciones, getInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.actions';
import { selectInscripcion, selectInscripciones } from 'src/app/Store/Inscripciones/feature-inscripciones.selectors';


@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.scss']
})
export class BajaComponent implements OnInit, OnDestroy {



  pageTitle: Title ={
    title: 'Baja de Inscripción'
  } ;
  inscripciones: Inscripciones[];
  inscripcion: Inscripciones;
  alumnos: Alumnos;
  cursos: Cursos;
  id: number;
  sub: Subscription;
  errorMessage = '';
  usuario:User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private inscripcionesServicio: InscripcionesService,
    private alumnosServicio: AlumnosService,
    private cursosServicio: CursosService,
    private formBuilder: UntypedFormBuilder,
    private store:Store<any>) { };

  bajaFormGroup: UntypedFormGroup = this.formBuilder.group({
    alumno: ['', Validators.required],
    curso: ['', Validators.required],
    fechaInicio: ['', Validators.required],
  })

  //Guardo la suscripcin y lleno el form con los datos y lo deshabilito
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })

    this.onGet();
    this.sub=this.store.select(selectInscripcion).subscribe(
      (val)=>{
        this.inscripcion=val;
        this.bajaFormGroup.patchValue(val);
         this.bajaFormGroup.disable();
      }
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )

  }
  //Envio el id de la inscripcion a eliminar y regenero la propiedad inscripciones[] para tenerla actuaizada. Redirijo a la lista de inscripciones
  submit() {
    this.store.dispatch(deleteInscripciones({ id: this.id }));
    
        this.router.navigate(["inscripciones"])
     
  };

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGet(){
    this.store.dispatch(getInscripciones({id:this.id}))
  }
}
