import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { addAlumnos } from 'src/app/Store/Alumnos/feature-alumnos.actions';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';

@Component({
  selector: 'app-agregar-alumnos',
  templateUrl: './agregar-alumnos.component.html',
  styleUrls: ['./agregar-alumnos.component.scss']
})
export class AgregarAlumnosComponent implements OnInit {

  pageTitle: Title = {
    title: 'Agregar Alumno'
  };
  alumno: Alumnos;
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  //Recupero la info del usuario 
  usuario: User;


  agregarFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],
  })

  ngOnInit(): void {
    this.store.dispatch(TitleChange({ title: this.pageTitle }));
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }

  //Post para agregar alumno
  submit() {
    let alumno: Alumnos = {
      id: 0,
      nombre: this.agregarFormGroup.controls["nombre"].value,
      apellido: this.agregarFormGroup.controls["apellido"].value,
      mail: this.agregarFormGroup.controls["mail"].value,
      edad: this.agregarFormGroup.controls["edad"].value,
      fechaNacimiento: this.agregarFormGroup.controls["fechaNacimiento"].value,
      usuario: this.agregarFormGroup.controls["usuario"].value,
    };

    this.store.dispatch(addAlumnos({ alumno: alumno }));
    this.router.navigate(["alumnos"]);
  };



}
