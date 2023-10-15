// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MyForm from './components/MyForm';

const App: React.FC = () => {
  return (
    <div>
      <MyForm />
    </div>
  );
};

const rootReducer = (state: any, action: any) => {
  // Implement your Redux store and reducers if needed
};

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
