import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../components/Home/slice/HomeSlice';
import recipeReducer from '../components/Recipe/slice/RecipeSlice';

const store = configureStore({
    reducer: {
        app: appReducer,
        recipe: recipeReducer,
    },
});

export default store;
export {store}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;