import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchRecipe = createAsyncThunk<any[], string>(
    'fetch/fetchRecipe',
    async (id) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if(!response.ok){
            throw new Error('Sorry, we could not find any recipe for you!');
        }
        const data = await response.json();
        return data.meals;
    }
);

export interface RecipeState {
    recipe: any[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
}

const initialState: RecipeState = {
    recipe: [],
    status: 'idle',
    error: null,
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipe.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchRecipe.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.recipe = action.payload !== null ? action.payload : state.recipe;
                state.error = null;
            })
            .addCase(fetchRecipe.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? null;
            });
    }
});

export default recipeSlice.reducer;
