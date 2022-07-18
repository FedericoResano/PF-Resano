import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/class/user';
import { Title } from 'src/app/shared/class/title';

export const loadAppStores = createAction(
  '[AppStore] Load AppStores'
);

export const loadAppStoresSuccess = createAction(
  '[AppStore] Load AppStores Success',
  props<{ data: any }>()
);

export const loadAppStoresFailure = createAction(
  '[AppStore] Load AppStores Failure',
  props<{ error: any }>()
);

export const Login =createAction(
  '[Login Page] Login',
  props<{user: User}>()
)

export const TitleChange =createAction(
  '[Title Page] Title',
  props<{title: Title}>()
)