import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as FeatureAlumnosActions from './feature-alumnos.actions';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';


@Injectable()
export class FeatureAlumnosEffects {

  loadFeatureAlumnossList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureAlumnosActions.loadFeatureAlumnoss),
      mergeMap(() => this.alumnosService.getAll()
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(alumnos => FeatureAlumnosActions.loadFeatureAlumnossListSuccess({ alumnos })),
          catchError(error => of(FeatureAlumnosActions.loadFeatureAlumnossFailure({ error }))))
      )
    );
  });

  getAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureAlumnosActions.getAlumnos),
      mergeMap((alumno) => this.alumnosService.get(alumno.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map((alumno) => FeatureAlumnosActions.getAlumnosSuccess({ alumno })),
          catchError(error => of(FeatureAlumnosActions.loadFeatureAlumnossFailure({ error }))))
      )
    );


  });

  editAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureAlumnosActions.editAlumnos),
      mergeMap((alumno) => this.alumnosService.update(alumno.alumno)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureAlumnosActions.loadFeatureAlumnoss()),
          catchError(error => of(FeatureAlumnosActions.loadFeatureAlumnossFailure({ error }))))
      )
    );
  });

  deleteAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureAlumnosActions.deleteAlumnos),
      mergeMap((alumno) => this.alumnosService.delete(alumno.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureAlumnosActions.loadFeatureAlumnoss()),
          catchError(error => of(FeatureAlumnosActions.loadFeatureAlumnossFailure({ error }))))
      )
    );
  });

  addAlumnos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureAlumnosActions.addAlumnos),
      mergeMap((alumno) => this.alumnosService.add(alumno.alumno)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureAlumnosActions.loadFeatureAlumnoss()),
          catchError(error => of(FeatureAlumnosActions.loadFeatureAlumnossFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private alumnosService: AlumnosService) { }
}
