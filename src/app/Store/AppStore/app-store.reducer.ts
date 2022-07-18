import { Action, createReducer, on } from '@ngrx/store';
import * as AppStoreActions from './app-store.actions';
import { UserState } from './user.state';
import {Login, TitleChange} from './app-store.actions'
import { TitleState } from './title.state';

export const appStoreFeatureKey = 'appStore';

export interface State {

}

export const initialState: UserState = {
  user:{
    user:'',
    clave:''
  }
  
};

export const initialStateTitle: TitleState = {
  title:{
    title:''
  }
  
};


export const userReducer=createReducer(
  initialState,
  on(Login, (state, {user})=>{
    return {...state, user}
  })
)

export const titleReducer=createReducer(
  initialStateTitle,
  on(TitleChange, (state, {title})=>{
    return {...state, title}
  })
)

export const reducer = createReducer(
  initialState,

  on(AppStoreActions.loadAppStores, state => state),
  on(AppStoreActions.loadAppStoresSuccess, (state, action) => state),
  on(AppStoreActions.loadAppStoresFailure, (state, action) => state),

);
