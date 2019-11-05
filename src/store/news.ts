import { combineReducers } from 'redux';
export const NS = 'news';

export const initialState = {
    data: null,
    loading: false,
    error: null,
};

const root = state => state[NS];
export const selectors = {
    root,
    data: state => root(state).data,
    loading: state => root(state).loading,
    error: state => root(state).error,
};

export const types = {
    get: `${NS}/GET`,
    suc: `${NS}/SUCCESS`,
    fail: `${NS}/FAIL`,
};

const getNews = () => ({
    type: types.get
});

export const actions = {
    getNews,
};

const rawReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.get:
            return { ...state, loading: true };
        case types.suc:
            return { ...state, data: payload, loading: false };
        case types.fail:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
};

export const reducer = combineReducers({
    [NS]: rawReducer
});
