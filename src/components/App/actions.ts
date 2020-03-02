import { LOGOUT } from 'reducers/login/constants';
import { FETCH_USER_INIT_APP } from 'reducers/profile/constants';

export const logout = () => ({ type: LOGOUT });

export const fetchUserInitApp = () => ({ type: FETCH_USER_INIT_APP });
