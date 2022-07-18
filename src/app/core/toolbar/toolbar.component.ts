import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { selectLoginUser, selectTitle } from 'src/app/Store/AppStore/app-store.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title:Title;
  user:User;
  
  constructor(private store:Store<any>) { }

  ngOnInit(): void {

    //Recupero la info del usuario
    this.store.select(selectLoginUser).subscribe(
      (val)=>
      this.user= val
    )

    //Recupero la info del titulo del componente abierto.
    this.store.select(selectTitle).subscribe(
      (val)=>
      this.title= val
    )
  }

}
