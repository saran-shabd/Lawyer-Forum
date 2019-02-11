import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// import root reducer
import rootReducer from './reducers';

// persist configuration
const persistConfig = {
  key: 'root',
  storage
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux store
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

export default (reduxStore = { store, persistor });
