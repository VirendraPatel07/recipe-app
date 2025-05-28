import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../components/Home/slice/HomeSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export default store;
export {store}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;