import { Component, OnInit } from '@angular/core';
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
import { addCursos } from 'src/app/Store/Cursos/feature-cursos.actions';


@Component({
  selector: 'app-agregar-cursos',
  templateUrl: './agregar-cursos.component.html',
  styleUrls: ['./agregar-cursos.component.scss']
})
export class AgregarCursosComponent implements OnInit {

  pageTitle: Title ={
    title: 'Agregar Curso'
  } ; 
  curso: Cursos;
  sub: Subscription;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cursosServicio: CursosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) {};

    usuario:User;
    
    //Armo el form
    agregarFormGroup: FormGroup = this.formBuilder.group({
      curso:['', [Validators.required, Validators.maxLength(50)]],
      duracion:['', [Validators.required, Validators.maxLength(50)]],
      precio:['', [Validators.required]],
    })

  ngOnInit(): void {
    this.store.dispatch(TitleChange({title: this.pageTitle}));
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
  }

  //Cargo los datos del form y genero el post 
  submit(){
    this.curso= {
      id: 0,
      curso: this.agregarFormGroup.controls["curso"].value,
      duracion: this.agregarFormGroup.controls["duracion"].value,
      precio: this.agregarFormGroup.controls["precio"].value
    };

    //Guardo la suscripcion
    this.store.dispatch(addCursos({curso:this.curso}));
    this.router.navigate(["cursos"]);

  };

  
}

