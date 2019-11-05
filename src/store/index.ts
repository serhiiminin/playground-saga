import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";
import {reducer} from "./news";


const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(...middleware),
    ),
);

sagaMiddleware.run(rootSaga);
