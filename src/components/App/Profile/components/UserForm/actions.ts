import { IProfileStore } from 'reducers/profile';
import { UPDATE_USER_PROFILE } from 'reducers/profile/constants';

export const updateUserProfile = (payload: Omit<IProfileStore, 'loading'>) => ({
    type: UPDATE_USER_PROFILE,
    payload,
});
