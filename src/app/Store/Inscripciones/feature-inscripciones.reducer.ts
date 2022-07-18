import { Action, createReducer, on } from '@ngrx/store';
import { Inscripciones } from 'src/app/shared/class/inscripciones';
import * as FeatureInscripcionesActions from './feature-inscripciones.actions';

export const featureInscripcionesFeatureKey = 'featureInscripciones';

export interface State {
  Inscripciones:Inscripciones[];
  Inscripcion:Inscripciones;
  loading:boolean;

}

export const initialState: State = {
  Inscripciones:[],
  Inscripcion:{id:0, alumno:'', curso:'', fechaInicio:'20220101', idAlumno:0, idCurso:0},
  loading:false
};

export const InscripcionesReducer = createReducer(
  initialState,

  on(FeatureInscripcionesActions.loadFeatureInscripciones, (state) =>{ 
    return{...state, loading:true}
  }),
  on(FeatureInscripcionesActions.loadFeatureInscripcionesSuccess, (state, {Inscripcion}) =>{
    return{...state, Inscripcion, loading:false}
  }),
  on(FeatureInscripcionesActions.loadFeatureInscripcionesListSuccess, (state, {Inscripciones}) =>{
    return{...state, Inscripciones, loading:false}
  }),
  on(FeatureInscripcionesActions.loadFeatureInscripcionesFailure, (state, action) => state),

  on(FeatureInscripcionesActions.getInscripcionesSuccess, (state, { Inscripcion }) => {
    return {...state, Inscripcion}
    })

);
