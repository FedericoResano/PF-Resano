import { createAction, props } from '@ngrx/store';
import { Alumnos } from 'src/app/shared/class/alumnos';

export const loadFeatureAlumnoss = createAction(
  '[FeatureAlumnos] Load FeatureAlumnoss',
);

export const loadFeatureAlumnossSuccess = createAction(
  '[FeatureAlumnos] Load FeatureAlumnoss Success',
  props<{alumno:Alumnos}>()
);

export const loadFeatureAlumnossListSuccess = createAction(
  '[FeatureAlumnos] Load FeatureAlumnossList Success',
  props<{ alumnos: Alumnos[] }>()
);

export const loadFeatureAlumnossFailure = createAction(
  '[FeatureAlumnos] Load FeatureAlumnoss Failure',
  props<{ error: any }>()
);

export const getAlumnos = createAction(
  '[FeatureAlumnos] get Alumnos',
  props<{id: number}>()
);

export const getAlumnosSuccess = createAction(
  '[FeatureAlumnos] get Alumnos success',
  props<{alumno: Alumnos}>()
);

export const addAlumnos=createAction(
  '[FeatureAlumnos] add FeatureAlumnos',
  props<{alumno: Alumnos}>()
);

export const deleteAlumnos=createAction(
  '[FeatureAlumnos] delete Alumnos',
  props<{id: number}>()
);

export const editAlumnos=createAction(
  '[FeatureAlumnos] edit Alumnos',
  props<{alumno: Alumnos}>()
);