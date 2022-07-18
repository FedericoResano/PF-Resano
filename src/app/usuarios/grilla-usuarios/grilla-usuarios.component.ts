import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { Usuarios } from 'src/app/shared/class/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { loadUsuariosFeature } from 'src/app/Store/Usuarios/usuarios-feature.actions';
import { selectUsuarios } from 'src/app/Store/Usuarios/usuarios-feature.selectors';


@Component({
  selector: 'app-grilla-usuarios',
  templateUrl: './grilla-usuarios.component.html',
  styleUrls: ['./grilla-usuarios.component.scss']
})
export class GrillaUsuariosComponent implements OnInit, OnDestroy {
  usuario:User;
  usuarios: Usuarios[];
  pageTitle: Title ={
    title: 'Listado de Usuarios'
  } ;
  errorMessage = '';
  sub: Subscription

  displayedColumns: string[] = ['Nickname', 'Nombre', 'Apellido', 'Accion'];
  constructor(private serviceUsuarios: UsuariosService,
              private store:Store<any>) { };


  //Guardo la sub y traigo los datos para armar la tabla.
  ngOnInit(): void {
    //this.hola();
    this.sub=this.store.select(selectUsuarios).subscribe(
      (val)=>{
        this.usuarios=val; 
      }
    )

    //Cargo la info del titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));
    
    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
   
  }

  //Desuscribo
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //hola(){
  //  this.store.dispatch(loadUsuariosFeature())
  //}

}