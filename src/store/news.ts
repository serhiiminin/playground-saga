import { combineReducers } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import { api } from '../api';


interface Todo {
    completed: boolean,
    id: number,
    title: string,
    userId: number,
}

interface Action<T> {
    type: string,
    payload: T,
}

type DataType = Todo[];
type LoadingType = boolean;
type ErrorType = Error | null;

export interface News {
    data: DataType,
    loading: LoadingType,
    error: ErrorType,
}

export const NS = 'news';

export const initialState = {
    data: [],
    loading: false,
    error: null,
};

const root = (state: any): News => state[NS];
export const selectors = {
    root,
    data: (state: any): DataType => root(state).data,
    loading: (state: any): LoadingType => root(state).loading,
    error: (state: any): ErrorType => root(state).error,
};

export const types = {
    get: `${NS}/GET`,
    suc: `${NS}/SUCCESS`,
    fail: `${NS}/FAIL`,
};

const rawReducer = (state = initialState, { type, payload }: Action<any>) => {
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

const getNews = () => ({ type: types.get });
const getSuccess = (payload: DataType): Action<DataType> => ({ type: types.suc, payload });
const getFail = (payload: DataType): Action<DataType> => ({ type: types.fail, payload });

export function* getNewsHandler() {
    try {
        const data = yield call(api.getList);

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
