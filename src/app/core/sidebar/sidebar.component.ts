import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/shared/class/user';
import { Login } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  usuario:User;
  constructor(private store:Store<any>) { }

  ngOnInit(): void {

    //Cargo la info del usuario.
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
  }

  cerrarSesion(){

    //Vacio los datos del usuario logueado y redirijo a login.
    let user:User= {
      user: '',
      clave: ''

    }
    this.store.dispatch(Login({user:user}));
  }

}
