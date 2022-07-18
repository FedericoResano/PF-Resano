import { Action, createReducer, on } from '@ngrx/store';
import { Cursos } from 'src/app/shared/class/cursos';
import * as FeatureCursosActions from './feature-cursos.actions';

export const featureCursosFeatureKey = 'featureCursos';

export interface State {
  cursos:Cursos[];
  curso:Cursos;
  loading:boolean;

}

export const initialState: State = {
  cursos:[],
  curso:{id:0, curso:'', duracion:'', precio:0 },
  loading:false
};

export const CursosReducer = createReducer(
  initialState,

  on(FeatureCursosActions.loadFeatureCursos, (state) =>{ 
    return{...state, loading:true}
  }),
  on(FeatureCursosActions.loadFeatureCursosSuccess, (state, {curso}) =>{
    return{...state, curso, loading:false}
  }),
  on(FeatureCursosActions.loadFeatureCursosListSuccess, (state, {cursos}) =>{
    return{...state, cursos, loading:false}
  }),
  on(FeatureCursosActions.loadFeatureCursosFailure, (state, action) => state),

  on(FeatureCursosActions.getCursosSuccess, (state, { curso }) => {
    return {...state, curso}
    })

);
