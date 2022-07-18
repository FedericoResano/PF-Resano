import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppStore from './app-store.reducer';
import { AppState } from './app-store.state';
import { TitleState } from './title.state';
import { UserState } from './user.state';

export const selectAppStoreState = createFeatureSelector<fromAppStore.State>(
  fromAppStore.appStoreFeatureKey
);

export const selectUserFeature= (state:AppState)=> state.user;


export const selectLoginUser= createSelector(
  selectUserFeature,
  (state: UserState)=> state.user
)

export const selectTitleFeature= (state:AppState)=> state.title;

export const selectTitle= createSelector(
  selectTitleFeature,
  (state: TitleState)=> state.title
)