import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AppStoreActions from './app-store.actions';


@Injectable()
export class AppStoreEffects {

  loadAppStores$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AppStoreActions.loadAppStores),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AppStoreActions.loadAppStoresSuccess({ data })),
          catchError(error => of(AppStoreActions.loadAppStoresFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
