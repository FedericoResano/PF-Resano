import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromFeatureInscripciones from './feature-inscripciones.reducer';

export const selectFeatureInscripcionesState = createFeatureSelector<fromFeatureInscripciones.State>(
  fromFeatureInscripciones.featureInscripcionesFeatureKey
);

export const selectInscripciones= createSelector(
  selectFeatureInscripcionesState,
  (state)=>state.Inscripciones
)

export const selectInscripcion= createSelector(
  selectFeatureInscripcionesState,
  (state)=>state.Inscripcion
)
export const selectLoading= createSelector(
  selectFeatureInscripcionesState,
  (state)=>state.loading
)

export const selectInscripcionesList= createSelector(
  selectInscripciones,
  (state)=>state
)

