import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store"; // Adjust the path to your store file
import { fetchRecipe } from './slice/RecipeSlice';

function Recipe() {
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();
    const recipe = useSelector((state: any) => state.recipe.recipe);
    const status = useSelector((state: { recipe: { status: string } }) => state.recipe.status);

    useEffect(() => {
        dispatch(fetchRecipe(id as string));
    },[]);

  return (
    <div>
        <div className = "container p-5">
            <h2 className="text-2xl text-center font-bold mb-5 mt-15">Recipe Details</h2>
            {status === 'pending' && <p className="text-center">Loading...</p>}
            {status === 'rejected' && <p className="text-center text-red-500">Sorry, we could not find recipe for you!</p>}
            {recipe && recipe.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6 mx-auto">
                    {recipe.map((item: any) => (
                        <div key={item.idMeal} className="card flex bg-white p-4 gap-10 rounded-lg border border-gray-300 shadow-md">  
                            <img src={item.strMealThumb} alt={item.strMeal} className="w-80 h-80 object-cover rounded-2xl mb-4" />
                            <div className ="grid">
                                <h3 className="text-xl font-semibold mb-2">{item.strMeal}</h3>
                                <p className="text-area overflow-y-auto h-40 p-2 border border-gray-300 rounded-md">
                                    {item.strInstructions}
                                </p>
                                <h3 className="text-xl font-semibold mt-2 ">Ingredients</h3>
                                <ul className="grid grid-cols-4 list-disc list-inside">
                                    {Object.keys(item).filter(key => key.startsWith('strIngredient') && item[key]).map((key, index) => (
                                        <li key={index}><b>{item[key]}</b></li>
                                    ))}
                                </ul>
                            </div>
                            <div className = "video w-full max-w-4xl mx-auto mt-10">
                            {item.strYoutube && ( 
                                <iframe
                                    height="400"
                                    src={`https://www.youtube.com/embed/${item.strYoutube.split('v=')[1]}`}
                                    title={item.strMeal}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                        </div>
                        
                    ))}
                </div>
            ) : (
                status !== 'pending' && <p className="text-center">No recipe found.</p>
            )}
        </div>
    </div>
  );
}

export default Recipe;