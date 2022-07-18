import { createAction, props } from '@ngrx/store';
import { Cursos } from 'src/app/shared/class/cursos';

export const loadFeatureCursos = createAction(
  '[FeatureCursos] Load FeatureCursos',
);

export const loadFeatureCursosSuccess = createAction(
  '[FeatureCursos] Load FeatureCursos Success',
  props<{curso:Cursos}>()
);

export const loadFeatureCursosListSuccess = createAction(
  '[FeatureCursos] Load FeatureCursosList Success',
  props<{ cursos: Cursos[] }>()
);

export const loadFeatureCursosFailure = createAction(
  '[FeatureCursos] Load FeatureCursos Failure',
  props<{ error: any }>()
);

export const getCursos = createAction(
  '[FeatureCursos] get Cursos',
  props<{id: number}>()
);

export const getCursosSuccess = createAction(
  '[FeatureCursos] get Cursos success',
  props<{curso: Cursos}>()
);

export const addCursos=createAction(
  '[FeatureCursos] add FeatureCursos',
  props<{curso: Cursos}>()
);

export const deleteCursos=createAction(
  '[FeatureCursos] delete Cursos',
  props<{id: number}>()
);

export const editCursos=createAction(
  '[FeatureCursos] edit Cursos',
  props<{curso: Cursos}>()
);