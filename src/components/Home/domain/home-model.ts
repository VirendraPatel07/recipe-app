export interface RecipeDTO {
    // idMeal : string;
    // strMeal : string;
    // quantity : number;
    name : string;
}

export const createRecipeDTO = (name: string) : RecipeDTO => ({
    // idMeal : item.idMeal,
    // strMeal : item.strMeal,
    // quantity : quantity,
    name : name
})

// export interface ApiUser { id: number; firstName: string; lastName: string; age: number; }
// export interface UserDTO extends ApiUser { fullName: string; isAdult: boolean; }
//
// export const toUserDTO = (data: ApiUser): UserDTO => ({
//   ...data,
//   fullName: `${data.firstName} ${data.lastName}`,
//   isAdult: data.age >= 18
// });

export interface Item{
    idMeal : string,
    strMeal : string,
    strCategory : string,
    strArea : string,
    strInstructions : string,
    strMealThumb : string,
    strTags : string,
    strYoutube : string,
    price : number,
    stock : number
}

// export interface BoughtItemDTO {
//     idMeal : string;
//     strMeal : string;
//     strMealThumb : string;
//     price : number;
//     quantity : number;
// }
// export const createBoughtItemDTO = (price: number, quantity: number) : BoughtItemDTO => ({
//     idMeal : item.idMeal;
//     strMeal 
// })

export interface BoughtItemDTO {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    price: number;
    quantity: number;
  }
  
  // Assuming `item` is an object that has idMeal, strMeal, and strMealThumb
  export const createBoughtItemDTO = (
    item: { idMeal: string; strMeal: string; strMealThumb: string },
    price: number,
    quantity: number
  ): BoughtItemDTO => ({
    idMeal: item.idMeal,
    strMeal: item.strMeal,
    strMealThumb: item.strMealThumb,
    price,
    quantity,
  });

export default createBoughtItemDTO;