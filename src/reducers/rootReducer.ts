import {AnyAction, combineReducers, Reducer} from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import browseGenres from './browseGenres';
import genres from './genres';
import homepage from './homepage';
import login from './login';
import navbar from './navbar';
import profile from './profile';
import register from './register';
import search from './search';
import watch from './watch';
import {FETCH_USER_INIT_APP, FETCH_USER_INIT_APP_SUCCEEDED} from "./profile/constants";

export interface IUserStore {
    avatarUrl: string
    firstName: string
    role: string
    isReady: boolean
}

export const userDefaultState: IUserStore = {
    avatarUrl: '',
    firstName: '',
    role: '',
    isReady: false,
};

const user: Reducer<IUserStore, AnyAction> = (state: IUserStore = userDefaultState, action: AnyAction): IUserStore => {
    switch(action.type) {
        case FETCH_USER_INIT_APP:
            return userDefaultState;
        case FETCH_USER_INIT_APP_SUCCEEDED:
            return {
                ...state,
                role: action.payload.role,
                firstName: action.payload.profile.first_name,
                avatarUrl: action.payload.profile.avatar,
                isReady: true,
            };
        default:
            return state;
    }
};

export default (history: History) => combineReducers({
    browseGenres,
    genres,
    homepage,
    login,
    navbar,
    profile,
    register,
    router: connectRouter(history),
    search,
    user,
    watch,
});
