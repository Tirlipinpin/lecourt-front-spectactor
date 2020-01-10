import { IProfileStore } from 'reducers/profile';
import { UPDATE_USER_PROFILE } from 'reducers/profile/constants';

export const updateUserProfile = (payload: IProfileStore) => ({
    type: UPDATE_USER_PROFILE,
    payload,
});
