import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLoginUser } from 'src/app/Store/AppStore/app-store.selectors';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  usuario:User;
  constructor(private route: Router, private store:Store<any>){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.store.select(selectLoginUser).subscribe(
        (val)=>this.usuario=val
      )
      if(this.usuario.user== '' || this.usuario.user== undefined){
        return this.route.navigate(['']).then(()=> false);
      }
    return true;
  }
  
}
