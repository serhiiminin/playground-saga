import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([
        // ...templatesSaga,
        // ...modelSaga,
        // ...logicSaga,
        // ...sampleSaga,
    ]);
}
