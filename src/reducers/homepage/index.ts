import { Reducer } from "react";
import { AnyAction } from "redux";

export interface HomepageStore {
    page: string,
};

export const defaultState: HomepageStore = {
    page: 'Homepage',
};

const homepageReducer: Reducer<HomepageStore | undefined, AnyAction> = (state: HomepageStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default homepageReducer;
