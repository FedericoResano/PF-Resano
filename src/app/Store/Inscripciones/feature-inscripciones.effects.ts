import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as FeatureInscripcionesActions from './feature-inscripciones.actions';
import { InscripcionesService } from 'src/app/shared/services/inscripciones.service';


@Injectable()
export class FeatureInscripcionesEffects {

  loadFeatureInscripcionesList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureInscripcionesActions.loadFeatureInscripciones),
      mergeMap(() => this.InscripcionesService.getAll()
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(Inscripciones => FeatureInscripcionesActions.loadFeatureInscripcionesListSuccess({ Inscripciones })),
          catchError(error => of(FeatureInscripcionesActions.loadFeatureInscripcionesFailure({ error }))))
      )
    );
  });

  getInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureInscripcionesActions.getInscripciones),
      mergeMap((curso) => this.InscripcionesService.get(curso.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map((Inscripcion) => FeatureInscripcionesActions.getInscripcionesSuccess({ Inscripcion })),
          catchError(error => of(FeatureInscripcionesActions.loadFeatureInscripcionesFailure({ error }))))
      )
    );


  });

  deleteInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureInscripcionesActions.deleteInscripciones),
      mergeMap((curso) => this.InscripcionesService.delete(curso.id)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureInscripcionesActions.loadFeatureInscripciones()),
          catchError(error => of(FeatureInscripcionesActions.loadFeatureInscripcionesFailure({ error }))))
      )
    );
  });

  addInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(FeatureInscripcionesActions.addInscripciones),
      mergeMap((Inscripcion) => this.InscripcionesService.add(Inscripcion.Inscripcion)
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        .pipe(
          map(() => FeatureInscripcionesActions.loadFeatureInscripciones()),
          catchError(error => of(FeatureInscripcionesActions.loadFeatureInscripcionesFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private InscripcionesService: InscripcionesService) { }
}
