import { Action, createReducer, on } from '@ngrx/store';
import { Alumnos } from 'src/app/shared/class/alumnos';
import * as FeatureAlumnosActions from './feature-alumnos.actions';

export const featureAlumnosFeatureKey = 'featureAlumnos';

export interface State {
  alumnos:Alumnos [];
  alumno:Alumnos;
  loading:boolean;

}

export const initialState: State = {
  alumnos:[],
  alumno:{id:0, apellido:'', nombre:'', mail:'', edad:0, fechaNacimiento:'20220101', usuario:''},
  loading:false
};

export const AlumnosReducer = createReducer(
  initialState,

  on(FeatureAlumnosActions.loadFeatureAlumnoss, (state) =>{ 
    return{...state, loading:true}
  }),
  on(FeatureAlumnosActions.loadFeatureAlumnossSuccess, (state, {alumno}) =>{
    return{...state, alumno, loading:false}
  }),
  on(FeatureAlumnosActions.loadFeatureAlumnossListSuccess, (state, {alumnos}) =>{
    return{...state, alumnos, loading:false}
  }),
  on(FeatureAlumnosActions.loadFeatureAlumnossFailure, (state, action) => state),

  on(FeatureAlumnosActions.getAlumnosSuccess, (state, { alumno }) => {
    return {...state, alumno}
    })

);
