import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError, tap, catchError } from 'rxjs';
import { Usuarios } from '../class/usuarios';


@Injectable({
  providedIn: 'root'
})


export class UsuariosService {
 
  private usuariosUrl=  "https://62a61d0e430ba53411d14cbe.mockapi.io/api/Usuarios";

  constructor(private http: HttpClient) { }

  //Metodo get para que traiga todos los alumnos y cargar la lista
  getAll():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.usuariosUrl).pipe(
      tap(),
      catchError(this.handleError)
      
    );
  }

  //Metodo get para recuperar la informacion de un alumno y cargar los formularios de Modificar y Eliminar
  get(id:number):Observable<Usuarios>{
    return this.http.get<Usuarios>(this.usuariosUrl +'/' + id).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  //Metodo update para modificar alumno
  update(alumnos:Usuarios){
    return this.http.put(this.usuariosUrl + '/' +alumnos.id, alumnos).pipe(
      tap(),
      catchError(this.handleError)
    )
  }

  //metodo delete para eliminar alumno
  delete(id:number){
    return this.http.delete(this.usuariosUrl + '/' + id).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  //post para dar de alta un alumno
  add(alumnos:Usuarios){
    return this.http.post(this.usuariosUrl, alumnos)
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error';
    
    return throwError(errorMessage);
  }
}
