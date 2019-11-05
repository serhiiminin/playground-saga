import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./store";
import './App.css';

const App: React.FC = () => (
    <Provider store={store}>
        <div className="App">
            Redux saga app
        </div>
    </Provider>
);

export default App;
