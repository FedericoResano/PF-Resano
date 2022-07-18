import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromFeatureUsuarios from './usuarios-feature.reducer';

export const selectUsuariosFeatureState = createFeatureSelector<fromFeatureUsuarios.State>(
  fromFeatureUsuarios.UsuariosFeatureKey
);

export const selectUsuarios= createSelector(
  selectUsuariosFeatureState,
  (state)=>state.usuarios
)

export const selectUsuario= createSelector(
  selectUsuariosFeatureState,
  (state)=>state.usuario
)
export const selectLoading= createSelector(
  selectUsuariosFeatureState,
  (state)=>state.loading
)

export const selectUsuarioList= createSelector(
  selectUsuario,
  (state)=>state
)

