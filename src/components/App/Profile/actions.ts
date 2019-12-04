import { FETCH_USER_PROFILE } from 'reducers/profile/constants';
import { IFetchUserProfileAction } from 'sagas/profile';

export const fetchUserProfile = (): IFetchUserProfileAction => ({
    type: FETCH_USER_PROFILE,
});
