import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumnos } from 'src/app/shared/class/alumnos';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectAlumno } from 'src/app/Store/Alumnos/feature-alumnos.selectors';
import { editAlumnos, getAlumnos } from 'src/app/Store/Alumnos/feature-alumnos.actions';
import { Store } from '@ngrx/store';
import { Title } from 'src/app/shared/class/title';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { User } from 'src/app/shared/class/user';


@Component({
  selector: 'app-modificar-alumnos',
  templateUrl: './modificar-alumnos.component.html',
  styleUrls: ['./modificar-alumnos.component.scss']
})
export class ModificarAlumnosComponent implements OnInit, OnDestroy {

  pageTitle: Title = {
    title: 'Editar Alumno'
  };
  alumno: Alumnos;
  sub: Subscription;
  errorMessage = '';
  id: number;
  usuario: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private alumnosServicio: AlumnosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };


  //Armo las propiedades del formulario.
  modificarFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    mail: ['', [Validators.required, Validators.email]],
    edad: ['', [Validators.required, Validators.max(99)]],
    fechaNacimiento: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.maxLength(50)]],
  })

  ngOnInit(): void {
    //cargo el formulario y la suscripcion
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })
    this.onGet();
    this.sub = this.store.select(selectAlumno).subscribe(
      (val) => {
        this.alumno = val;
        this.modificarFormGroup.patchValue(val);

      }
    )

    //Cargo el titulo del componente
    this.store.dispatch(TitleChange({ title: this.pageTitle }));

    //Recupero la info del usuario 
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }
  //Cargo los datos que tengo en el formulario en la propiedad de alumno y se la paso en un update al servicio. Redirijo a la pagina del listado
  submit() {
    let alumno: Alumnos = {

      id: this.id,
      apellido: this.modificarFormGroup.get("apellido")?.value,
      nombre: this.modificarFormGroup.get("nombre")?.value,
      mail: this.modificarFormGroup.get("mail")?.value,
      edad: this.modificarFormGroup.get("edad")?.value,
      fechaNacimiento: this.modificarFormGroup.get("fechaNacimiento")?.value,
      usuario: this.modificarFormGroup.get("usuario").value
    }

    this.store.dispatch(editAlumnos({ alumno: alumno }));
    this.router.navigate(["alumnos"]);
  }

  //Desuscribo
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onGet() {
    this.store.dispatch(getAlumnos({ id: this.id }))
  }
}
