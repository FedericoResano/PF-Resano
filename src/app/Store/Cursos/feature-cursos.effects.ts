import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as FeatureCursosActions from './feature-cursos.actions';
import { CursosService } from 'src/app/shared/services/cursos.service';


@Injectable()
export class FeatureCursosEffects {

  loadFeatureCursosList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureCursosActions.loadFeatureCursos),
      mergeMap(() => this.cursosService.getAll()
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(cursos => FeatureCursosActions.loadFeatureCursosListSuccess({ cursos })),
          catchError(error => of(FeatureCursosActions.loadFeatureCursosFailure({ error }))))
      )
    );
  });

  getCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureCursosActions.getCursos),
      mergeMap((curso) => this.cursosService.get(curso.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map((curso) => FeatureCursosActions.getCursosSuccess({ curso })),
          catchError(error => of(FeatureCursosActions.loadFeatureCursosFailure({ error }))))
      )
    );


  });

  editCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureCursosActions.editCursos),
      mergeMap((curso) => this.cursosService.update(curso.curso)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureCursosActions.loadFeatureCursos()),
          catchError(error => of(FeatureCursosActions.loadFeatureCursosFailure({ error }))))
      )
    );
  });

  deleteCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureCursosActions.deleteCursos),
      mergeMap((curso) => this.cursosService.delete(curso.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureCursosActions.loadFeatureCursos()),
          catchError(error => of(FeatureCursosActions.loadFeatureCursosFailure({ error }))))
      )
    );
  });

  addCursos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureCursosActions.addCursos),
      mergeMap((curso) => this.cursosService.add(curso.curso)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureCursosActions.loadFeatureCursos()),
          catchError(error => of(FeatureCursosActions.loadFeatureCursosFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private cursosService: CursosService) { }
}
