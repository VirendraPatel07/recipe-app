import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk<any[], string>(
    'recipe/fetchRecipes',
    async (recipe) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipe}`);
        if(!response.ok){
            throw new Error('Sorry, we could not find any recipe for you!');
        }
        const data = await response.json();
        return data.meals;
    }
);

const initialState: { 
    recipes: any[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | null,
} = { 
    recipes: [],
    status: 'idle',
    error: null,
};

const recipesSlice = createSlice({
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
            .addCase(fetchRecipes.pending, (state)=>{
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) =>{
                state.status = 'fulfilled';
                state.recipes = action.payload !== null ? state.recipes.concat(action.payload) : state.recipes;
                state.error = null;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? null;
            })
    },
});


export const { clearRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;