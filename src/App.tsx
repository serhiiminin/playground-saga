import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./store";
import List from './components/list'
import './App.css';

const App: React.FC = () => (
    <Provider store={store}>
        <div className="App">
            <List/>
        </div>
    </Provider>
);

export default App;
