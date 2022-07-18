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
    this.store.select(selectLoginUser).subscribe(
      (val)=>
      this.user= val
    )
    this.store.select(selectTitle).subscribe(
      (val)=>
      this.title= val
    )
  }

}
