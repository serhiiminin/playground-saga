import { all } from 'redux-saga/effects';
import * as newsDuck from './news'

export function* rootSaga() {
    yield all([
        ...newsDuck.saga,
    ]);
}
