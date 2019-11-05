import { combineReducers } from 'redux';
import { takeLatest, put } from 'redux-saga/effects';

export const NS = 'news';

export const initialState = {
    data: null,
    loading: false,
    error: null,
};

// @ts-ignore
const root = state => state[NS];
export const selectors = {
    root,
// @ts-ignore
    data: state => root(state).data,
// @ts-ignore
    loading: state => root(state).loading,
// @ts-ignore
    error: state => root(state).error,
};

export const types = {
    get: `${NS}/GET`,
    suc: `${NS}/SUCCESS`,
    fail: `${NS}/FAIL`,
};

// @ts-ignore
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

// @ts-ignore
const getNews = () => ({ type: types.get });
// @ts-ignore
const getSuccess = payload => ({ type: types.suc, payload });
// @ts-ignore
const getFail = payload => ({ type: types.fail, payload });

export function* getNewsHandler() {
    try {
        const data = yield fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json());
        yield put(getSuccess(data));
    } catch (err) {
        yield put(getFail(err));
    }
}

export const actions = {
    getNews,
};

export const saga = [
    takeLatest(types.get, getNewsHandler),
];
