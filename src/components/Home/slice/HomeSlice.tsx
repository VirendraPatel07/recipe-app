import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipe = createAsyncThunk<any[], string>(
    'recipe/fetchRecipe',
    async (recipe) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipe}`);
        if(!response.ok){
            throw new Error('Sorry, we could not find any recipe for you!');
        }
        const data = await response.json();
        return data.meals;
    }
);

export const fetchRecipeBySearch = createAsyncThunk<any[], string>(
    'recipe/fetchRecipeBySearch',
    async(recipe) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
        if(!response.ok){
            throw new Error('Sorry, we could not find any recipe for you!');
        }
        const data = await response.json();
        return data.meals;
    }
)

const initialState: { 
    recipes: any[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | null,
} = { 
    recipes: [],
    status: 'idle',
    error: null,
};

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        clearRecipe: (state) => {
            state.recipes = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipe.pending, (state)=>{
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchRecipe.fulfilled, (state, action) =>{
                state.status = 'fulfilled';
                // state.recipes = action.payload;
                state.recipes = action.payload !== null ? state.recipes.concat(action.payload) : state.recipes;
                state.error = null;
            })
            .addCase(fetchRecipe.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? null;
            })
            .addCase(fetchRecipeBySearch.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.recipes = action.payload;
                state.error = null;
        })
    },
});


export const { clearRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;