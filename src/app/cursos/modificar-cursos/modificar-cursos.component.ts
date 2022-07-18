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
import { editCursos, getCursos } from 'src/app/Store/Cursos/feature-cursos.actions';
import { selectCurso } from 'src/app/Store/Cursos/feature-cursos.selectors';


@Component({
  selector: 'app-modificar-cursos',
  templateUrl: './modificar-cursos.component.html',
  styleUrls: ['./modificar-cursos.component.scss']
})
export class ModificarCursosComponent implements OnInit, OnDestroy {
  pageTitle: Title = {
    title: 'Editar Curso'
  };
  curso: Cursos;
  sub: Subscription;
  errorMessage = '';
  id: number;
  usuario: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  

  //Armo las propiedades del formulario.
  modificarFormGroup: FormGroup = this.formBuilder.group({
    curso: ['', [Validators.required, Validators.maxLength(50)]],
    duracion: ['', [Validators.required, Validators.maxLength(50)]],
    precio: ['', [Validators.required]],
  })

  ngOnInit(): void {
    //Guardo la suscripcion y recupero los datos para llenar el formulario
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })
    this.onGet();
    this.sub = this.store.select(selectCurso).subscribe(
      (val) => {
        this.curso = val;
        this.modificarFormGroup.patchValue(val);

      }
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({ title: this.pageTitle }));

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val) => this.usuario = val
    )
  }
  //Cargo los datos que tengo en el formulario en la propiedad de curso y se la paso en un update al servicio. Redirijo a la pagina del listado
  submit() {
    let curso: Cursos = {
      id: this.id,
      curso: this.modificarFormGroup.get("curso").value,
      duracion: this.modificarFormGroup.get("duracion").value,
      precio: this.modificarFormGroup.get("precio").value,
    }

    this.store.dispatch(editCursos({ curso: curso }));
    this.router.navigate(["cursos"]);

  }
  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGet() {
    this.store.dispatch(getCursos({ id: this.id }))
  }
}

