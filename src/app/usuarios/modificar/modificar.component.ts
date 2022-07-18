import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { Usuarios } from 'src/app/shared/class/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { editUsuarios, getUsuarios } from 'src/app/Store/Usuarios/usuarios-feature.actions';
import { selectUsuario } from 'src/app/Store/Usuarios/usuarios-feature.selectors';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {
  pageTitle: Title ={
    title: 'Editar Usuario'
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
  modificarFormGroup: FormGroup = this.formBuilder.group({
    Nombre: ['', [Validators.required, Validators.maxLength(50)]],
    Apellido: ['', [Validators.required, Validators.maxLength(50)]],
    Nickname: ['', [Validators.required, Validators.maxLength(50)]],
    Clave: ['', [Validators.required, Validators.maxLength(50)]],
  })

  ngOnInit(): void {
    //Guardo la suscripcion y recupero los datos para llenar el formulario
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
    })
    this.onGet();
    this.sub=this.store.select(selectUsuario).subscribe(
      (val)=>{
        this.usuario=val;
        this.modificarFormGroup.patchValue(val);
          
      }
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuarios=val
    )
  }
  //Cargo los datos que tengo en el formulario en la propiedad de curso y se la paso en un update al servicio. Redirijo a la pagina del listado
  submit() {
    let usuario:Usuarios = {
    id: this.id,
    Apellido: this.modificarFormGroup.get("Apellido").value,
    Nombre : this.modificarFormGroup.get("Nombre").value,
    Nickname: this.modificarFormGroup.get("Nickname").value,
    Clave: this.modificarFormGroup.get("Clave").value
    }

    this.store.dispatch(editUsuarios({usuario:usuario}));
      this.router.navigate(["usuarios"]);
    
  }
  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onGet(){
    this.store.dispatch(getUsuarios({id:this.id}))
  }

}
