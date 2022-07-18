import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UsuariosFeatureActions from './usuarios-feature.actions';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';


@Injectable()
export class UsuariosFeatureEffects {

  loadUsuariosFeaturesList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosFeatureActions.loadUsuariosFeature),
      mergeMap(() => this.usuariosService.getAll()
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(usuarios => UsuariosFeatureActions.loadUsuariosFeatureListSuccess({ usuarios })),
          catchError(error => of(UsuariosFeatureActions.loadUsuariosFeatureFailure({ error }))))
      )
    );
  });

  getUsuarios$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosFeatureActions.getUsuarios),
      mergeMap((usuario) => this.usuariosService.get(usuario.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map((usuario) => UsuariosFeatureActions.getUsuariosSuccess({ usuario })),
          catchError(error => of(UsuariosFeatureActions.loadUsuariosFeatureFailure({ error }))))
      )
    );


  });

  editAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosFeatureActions.editUsuarios),
      mergeMap((usuario) => this.usuariosService.update(usuario.usuario)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => UsuariosFeatureActions.loadUsuariosFeature()),
          catchError(error => of(UsuariosFeatureActions.loadUsuariosFeatureFailure({ error }))))
      )
    );
  });

  deleteAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosFeatureActions.deleteUsuarios),
      mergeMap((usuario) => this.usuariosService.delete(usuario.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => UsuariosFeatureActions.loadUsuariosFeature()),
          catchError(error => of(UsuariosFeatureActions.loadUsuariosFeatureFailure({ error }))))
      )
    );
  });

  addAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosFeatureActions.addUsuarios),
      mergeMap((usuario) => this.usuariosService.add(usuario.usuario)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => UsuariosFeatureActions.loadUsuariosFeature()),
          catchError(error => of(UsuariosFeatureActions.loadUsuariosFeatureFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private usuariosService: UsuariosService) { }
}
