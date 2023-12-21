import { configureStore, combineReducers, AnyAction, Reducer  } from '@reduxjs/toolkit';
import { cartReducer } from './reducer/cartSlice';
import { likeReducer } from './reducer/likeSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cartReducer,
  likeReducer,
});

const rootReducers: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'cart/clearResults') {

    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root')

    state = {} as RootState
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default rootReducers;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
