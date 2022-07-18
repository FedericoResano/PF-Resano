import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from 'src/app/shared/class/title';
import { User } from 'src/app/shared/class/user';
import { Login, TitleChange } from 'src/app/Store/AppStore/app-store.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,private store: Store<any>) { }

  pageTitle: Title ={
    title: 'Login'
  } ;
  //Doy de alta el form para el login
  loginFormGroup: FormGroup= this.formBuilder.group({
    Usuario:['', [Validators.required]],
    Clave:['', [Validators.required]],
  })

  ngOnInit(): void {
    
    //Cargo el titulo del componente
    this.store.dispatch(TitleChange({title: this.pageTitle}));
    
  }

  
  //Cargo el dato del usuario en el Store y redirijo a la pagina de Inicio
  submit(){
    let user:User= {
      user: this.loginFormGroup.get("Usuario")?.value,
      clave: this.loginFormGroup.get("Clave")?.value

    }
    this.store.dispatch(Login({user:user}));
    this.router.navigate(["/inicio"]);
  }


}
