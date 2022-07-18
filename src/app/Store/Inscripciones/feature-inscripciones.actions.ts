import { createAction, props } from '@ngrx/store';
import { Inscripciones } from 'src/app/shared/class/inscripciones';

export const loadFeatureInscripciones = createAction(
  '[FeatureInscripciones] Load FeatureInscripciones',
);

export const loadFeatureInscripcionesSuccess = createAction(
  '[FeatureInscripciones] Load FeatureInscripciones Success',
  props<{Inscripcion:Inscripciones}>()
);

export const loadFeatureInscripcionesListSuccess = createAction(
  '[FeatureInscripciones] Load FeatureInscripcionesList Success',
  props<{ Inscripciones: Inscripciones[] }>()
);

export const loadFeatureInscripcionesFailure = createAction(
  '[FeatureInscripciones] Load FeatureInscripciones Failure',
  props<{ error: any }>()
);

export const getInscripciones = createAction(
  '[FeatureInscripciones] get Inscripciones',
  props<{id: number}>()
);

export const getInscripcionesSuccess = createAction(
  '[FeatureInscripciones] get Inscripciones success',
  props<{Inscripcion: Inscripciones}>()
);

export const addInscripciones=createAction(
  '[FeatureInscripciones] add FeatureInscripciones',
  props<{Inscripcion: Inscripciones}>()
);

export const deleteInscripciones=createAction(
  '[FeatureInscripciones] delete Inscripciones',
  props<{id: number}>()
);

