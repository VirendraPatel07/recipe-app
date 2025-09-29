export interface RecipeDTO {
    // idMeal : string;
    // strMeal : string;
    // quantity : number;
    name : string;
}

export const createRecipeDTO = (name: string): RecipeDTO => ({
    // idMeal : item.idMeal,
    // strMeal : item.strMeal,
    // quantity : quantity,
    name : name
})
