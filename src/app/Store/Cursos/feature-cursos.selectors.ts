import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromFeatureCursos from './feature-cursos.reducer';

export const selectFeatureCursosState = createFeatureSelector<fromFeatureCursos.State>(
  fromFeatureCursos.featureCursosFeatureKey
);

export const selectCursos= createSelector(
  selectFeatureCursosState,
  (state)=>state.cursos
)

export const selectCurso= createSelector(
  selectFeatureCursosState,
  (state)=>state.curso
)
export const selectLoading= createSelector(
  selectFeatureCursosState,
  (state)=>state.loading
)

export const selectCursosList= createSelector(
  selectCursos,
  (state)=>state
)

