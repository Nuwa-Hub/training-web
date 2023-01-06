import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import messageReducer from "./messageRedux"
import createSagaMiddleware from 'redux-saga'

import {
  persistStore,
  persistReducer,
 
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "./messageSaga";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  user: userReducer,
  message:messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
export let persistor = persistStore(store);