import { createAction, props } from '@ngrx/store';
import { Usuarios } from 'src/app/shared/class/usuarios';

export const loadUsuariosFeature = createAction(
  '[UsuariosFeature] Load UsuariosFeature',
);

export const loadUsuariosFeatureSuccess = createAction(
  '[UsuariosFeature] Load UsuariosFeature Success',
  props<{usuario:Usuarios}>()
);

export const loadUsuariosFeatureListSuccess = createAction(
  '[UsuariosFeature] Load UsuariosFeature Success',
  props<{ usuarios: Usuarios[] }>()
);

export const loadUsuariosFeatureFailure = createAction(
  '[UsuariosFeature] Load UsuariosFeature Failure',
  props<{ error: any }>()
);

export const getUsuarios = createAction(
  '[UsuariosFeature] get Usuarios',
  props<{id: number}>()
);

export const getUsuariosSuccess = createAction(
  '[UsuariosFeature] get Usuarios success',
  props<{usuario: Usuarios}>()
);

export const addUsuarios=createAction(
  '[UsuariosFeature] add UsuariosFeature',
  props<{usuario: Usuarios}>()
);

export const deleteUsuarios=createAction(
  '[UsuariosFeature] delete Usuarios',
  props<{id: number}>()
);

export const editUsuarios=createAction(
  '[UsuariosFeature] edit Usuarios',
  props<{usuario: Usuarios}>()
);