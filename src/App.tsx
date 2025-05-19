import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipe, clearRecipe } from './AppSlice'

function App() {
  //const [count, setCount] = useState(0)
  const [recipe, setRecipe] = useState<string>('');
  const dispatch = useDispatch<typeof import('./redux/store').store.dispatch>();
  const recipeData = useSelector((state: any) => state.app.recipes);
  const status = useSelector((state: { app: { status: string } }) => state.app.status);
  // const error = useSelector((state: { app: { error: string } }) => state.app.error);
 
  return (
    <>
      <h2 className='text-4xl text-center mt-30 font-bold'>FOOD RECIPE APP</h2>
      <div className='container mx-auto px-4 grid justify-center items-center mt-10 gap-10'>
      <div className='card flex flex-wrap justify-center bg-gray-200 rounded-2xl p-10 w-full max-w-4xl mx-auto'>
        <input
          type='text'
          id='search'
          className='bg-gray-300 text-2xl px-4 py-2 rounded-2xl w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4'
          placeholder='Search recipe ...'
          onChange={(e) =>  setRecipe(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              dispatch(fetchRecipe(recipe))
            }
          }
        }
        />
        <button
          className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl text-2xl px-4 py-2'
          type='submit'
          onClick={(e) => {
            e.preventDefault()
            dispatch(fetchRecipe(recipe))
          }}
        >
          Search
        </button>
      </div>
      <h3 className='text-4xl text-center font-bold'>Search and Get Recipes</h3>
      {status === 'pending' && <p className='text-2xl text-center'>Loading...</p>}
      {status === 'rejected' && <p className='text-2xl text-red-600 text-center'>NO data found</p>}
      {status === 'fulfilled' && recipeData === null ? (
        <p className='text-2xl text-red-600 text-center'>
          Sorry, we could not find any recipe for you!
        </p>
      ) : (
        <div className='card bg-gray-200 rounded-2xl p-10 w-full max-w-7xl mx-auto'>
          {recipeData !== null && recipeData.length > 0 && (
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {recipeData.map((item: any) => (
                <div key={item.idMeal} className='bg-gray-300 rounded-2xl p-4 w-full'>
                  <img
                    src={item.strMealThumb}
                    alt={item.strMeal}
                    className='rounded-2xl mb-4 w-full object-cover'
                  />
                  <div className='flex mb-4 justify-between mx-auto'>
                    <h3 className='text-xl font-bold'>{item.strMeal}</h3>
                    <button className='bg-green-400 rounded-2xl px-4 mx-auto '> ADD</button> 
                  </div>
                  <p className='text-sm text-gray-700 line-clamp-3'>{item.strInstructions}</p>
                </div>
              ))}
            </div>
          )}
          <button
            className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl text-2xl px-4 py-2 mt-4'
            onClick={() => {
              dispatch(clearRecipe())
              setRecipe('')
            }}
          >
            Clear
          </button>
        </div>
      )}
      </div>
    </>
  )
}

export default App
