import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { TitleChange } from 'src/app/Store/AppStore/app-store.actions';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  pageTitle: Title ={
    title: 'Inicio'
  } ;
  usuario:User;
  constructor(private store:Store<any>) { }

  
  ngOnInit(): void {

    //Recupero la info del usuario logueado
    this.store.select(selectLoginUser).subscribe(
      (val)=>this.usuario=val
    )
    //Cargo el titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));
  }

}
