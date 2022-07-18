import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromFeatureAlumnos from './feature-alumnos.reducer';

export const selectFeatureAlumnosState = createFeatureSelector<fromFeatureAlumnos.State>(
  fromFeatureAlumnos.featureAlumnosFeatureKey
);

export const selectAlumnos= createSelector(
  selectFeatureAlumnosState,
  (state)=>state.alumnos
)

export const selectAlumno= createSelector(
  selectFeatureAlumnosState,
  (state)=>state.alumno
)
export const selectLoading= createSelector(
  selectFeatureAlumnosState,
  (state)=>state.loading
)

export const selectAlumnosList= createSelector(
  selectAlumno,
  (state)=>state
)

