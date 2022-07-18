import { Action, createReducer, on } from '@ngrx/store';
import { Usuarios } from 'src/app/shared/class/usuarios';
import * as UsuariosFeatureActions from './usuarios-feature.actions';

export const UsuariosFeatureKey = 'UsuariosFeature';

export interface State {
  usuarios:Usuarios [];
  usuario:Usuarios;
  loading:boolean;

}

export const initialState: State = {
  usuarios:[],
  usuario:{id:0, Apellido:'', Nombre:'', Nickname:'', Clave:''},
  loading:false
};

export const UsuariosReducer = createReducer(
  initialState,

  on(UsuariosFeatureActions.loadUsuariosFeature, (state) =>{ 
    return{...state, loading:true}
  }),
  on(UsuariosFeatureActions.loadUsuariosFeatureSuccess, (state, {usuario}) =>{
    return{...state, usuario, loading:false}
  }),
  on(UsuariosFeatureActions.loadUsuariosFeatureListSuccess, (state, {usuarios}) =>{
    return{...state, usuarios, loading:false}
  }),
  on(UsuariosFeatureActions.loadUsuariosFeatureFailure, (state, action) => state),

  on(UsuariosFeatureActions.getUsuariosSuccess, (state, { usuario }) => {
    return {...state, usuario}
    })

);
