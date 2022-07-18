import { ActionReducerMap } from "@ngrx/store";
import { CursosReducer } from "../Cursos/feature-cursos.reducer";
import { titleReducer, userReducer } from "./app-store.reducer";
import { TitleState } from "./title.state";
import { UserState } from "./user.state";

export interface AppState{
    user:UserState,
    title:TitleState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState>={
    user:userReducer,
    title:titleReducer
    
}