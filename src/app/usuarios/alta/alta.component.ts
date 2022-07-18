import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { Usuarios } from 'src/app/shared/class/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { addUsuarios } from 'src/app/Store/Usuarios/usuarios-feature.actions';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {
  pageTitle: Title ={
    title: 'Agregar Usuario'
  } ;
  usuario: Usuarios;
  sub: Subscription;
  errorMessage = '';
  id:number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private UsuariosServicio: UsuariosService,
    private formBuilder: FormBuilder,
    private store: Store<any>) { };

  //Recupero la info del usuario 
  usuarios:User;

  //Armo las propiedades del formulario.
  agregarFormGroup: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.maxLength(50)]],
    nickName: ['', [Validators.required, Validators.maxLength(50)]],
    clave: ['', [Validators.required, Validators.maxLength(50)]],
  });
  ngOnInit(): void {

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuarios=val
    )
  }

  //Cargo los datos del form y genero el post 
  submit(){
    this.usuario= {
      id: 0,
      Nombre: this.agregarFormGroup.controls["nombre"].value,
      Apellido: this.agregarFormGroup.controls["apellido"].value,
      Nickname: this.agregarFormGroup.controls["nickName"].value,
      Clave: this.agregarFormGroup.controls["clave"].value,
    };

    
    this.store.dispatch(addUsuarios({usuario:this.usuario}));
    this.router.navigate(["usuarios"]);

  };

}
