import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipe, clearRecipe } from './AppSlice'

function App() {
  const [count, setCount] = useState(0)
  const [recipe, setRecipe] = useState('');
  const dispatch = useDispatch();
  const recipeData = useSelector((state: any) => state.app.recipes);
  const status = useSelector((state: { app: { status: string } }) => state.app.status);
  // const error = useSelector((state: { app: { error: string } }) => state.app.error);

  useEffect(() => {
    if (status === 'fulfilled' && recipeData === null) {
      alert('Sorry, we could not find any recipe for you!');
    }
  }, [status, recipeData]);

  const handleSearch = () => {
    if (recipe) {
      dispatch(fetchRecipe(recipe));
    } else {
      alert('Please enter a recipe to search.');
    }
  };

  const handleClear = () => {
    dispatch(clearRecipe());
    setRecipe('');
  };

  return (
    <>
      <h2 className='text-4xl text-center mt-10'><b>FOOD RECIPE APP</b></h2>
      <div className='container grid justify-center items-center mx-50 mt-10 gap-10'>
        <div className="card flex justify-center bg-gray-200 rounded-2xl p-10">  
          <input type="text" 
            className='bg-gray-300 text-2xl mx-10 px-4 py-2 rounded-2xl'
            placeholder='Search recipe ...'
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            id='search' />
          <button 
            className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl text-2xl px-4 py-2 mx-5'
            type='submit'
            onClick={handleSearch}
          >Search</button>
        </div>

        <h3 className='text-4xl text-center'><b> Search and Get Recipes </b></h3>
        {status === 'pending' && <p className='text-2xl'>Loading...</p>}
        {status === 'rejected' && <p className='text-2xl text-red-600'>No data found</p>}
        {status === 'fulfilled' && recipeData && recipeData.length > 0 && <p className='text-2xl text-green-600'>Found {recipeData.length} recipes!</p>}
        {status === 'fulfilled' && <div className='card grid justify-center bg-gray-200 rounded-2xl p-10'>
          {recipeData && recipeData.length > 0 && (
            <div className='grid grid-cols-3 gap-4'>
              {recipeData.map((item: any) => (
                <div key={item.idMeal} className='bg-gray-300 rounded-2xl p-4'>
                  <img src={item.strMealThumb} alt={item.strMeal} className='rounded-2xl mb-4' />
                  <h3 className='text-xl font-bold'>{item.strMeal}</h3>
                  <p>{item.strInstructions}</p>
                </div>
              ))}
            </div>
          )}
          
          <button 
            className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl text-2xl px-4 py-2 mt-4'
            onClick={handleClear}
          >Clear</button>
        </div>}
          

      

        <div className='card flex justify-center bg-gray-200 rounded-2xl p-10'>
          <textarea 
            className='bg-gray-300 mx-10 text-2xl px-4 py-2 rounded-2xl'
            placeholder='Search recipe ...'
            id='search'
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            rows={1} 
            cols={50}>
          </textarea>
          <button 
            className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl text-2xl px-4 py-2'
            onClick={() => setCount((count) => count + 1)}
          >Count is {count}</button>
          <button
            className={`text-black bg-gray-300 hover:bg-gray-500 hover:text-white rounded-2xl text-2xl px-4 py-2 ml-4
            ${count === 0 ? 'cursor-not-allowed' : ''}`}

            onClick={() => setCount(0)}
            disabled={count === 0}
          >Reset</button>
        </div>
      </div>
    </>
  )
}

export default App