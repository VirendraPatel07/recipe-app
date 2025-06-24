import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRecipe } from './slice/HomeSlice'

function App() {
  //const [count, setCount] = useState(0)
  const [recipe, setRecipe] = useState<string>('');
  const dispatch = useDispatch<typeof import('../../redux/store').store.dispatch>();
  const recipeData = useSelector((state: any) => state.app.recipes);
  const status = useSelector((state: { app: { status: string } }) => state.app.status);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const [filteredData, setFilteredData] = useState<any[] | false>(false);
  // const error = useSelector((state: { app: { error: string } }) => state.app.error);

  useEffect(() => {
    alphabet.split('').forEach((letter) => {
      if (letter === '') {
        return;
      } else {
        dispatch(fetchRecipe(letter));
      }
    });
  }, []);

  const filterData = () => {
    if(recipeData && recipeData.length > 0) {
      const filtered = recipeData.filter((item: any) => (
        item.strMeal.toLowerCase().includes(recipe.toLowerCase())
      ));
      setFilteredData([]);
      setFilteredData(filtered);
      // recipeData = filtered; // Removed as recipeData is a constant
    } else {
      setFilteredData([]);
    }
  };

 
  return (
    <>
      <h2 className='text-xl text-center mt-20 font-bold'>FOOD RECIPE APP</h2>
      <div className='container mx-auto px-4 grid justify-center items-center gap-10 mt-10'>
      <div className='card flex flex-wrap justify-center bg-gray-200 rounded-2xl p-4 w-full max-w-4xl mx-auto'>
        <input
          type='text'
          id='search'
          value={recipe}
          className='bg-gray-300 px-2 py-1 rounded-2xl w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4'
          placeholder='Search recipe ...'
          onChange={(e) =>  setRecipe(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              // dispatch(fetchRecipeBySearch(recipe))
              if(recipe.trim() !== '') {
                filterData();
              } 
            }
          }
        }
        />
        <button
          className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl px-2 py-1 
          transition-shadow duration-300 ease-in-out'
          onClick={(e) => {
            e.preventDefault()
            // dispatch(fetchRecipeBySearch(recipe))
            if(recipe.trim() !== '') {
              filterData();
            } 
          }}
        >
          Search
        </button>
        <button 
          className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl px-2 py-1 ml-2'
          onClick={(e) => {
            e.preventDefault()
            setFilteredData(false);
            setRecipe('');
          }}
      >
          Clear filter
          </button>
      </div>
      <h3 className='text-center font-bold'>Search and Get Recipes</h3>
      {/* {status === 'pending' && <p className='text-center'>Loading...</p>} */}
      {status === 'pending' && <img src='/images/Apple animated.gif' alt='loading' className='w-20 h-20 rounded-2xl mx-auto' />}
      {status === 'rejected' && <p className='text-red-600 text-center'>No data found</p>}
      {status === 'fulfilled' && recipeData === null ? (
        <p className='text-red-600 text-center'>
          Sorry, we could not find any recipe for you!
        </p>
      ) : (
        <div className='card bg-gray-200 rounded-2xl p-5 w-full max-w-4xl mx-auto'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {((filteredData) ? filteredData : recipeData).map((item: any) => (
                <div key={item.idMeal} className='bg-gray-300 hover:bg-green-50 hover:scale-105 rounded-2xl p-4 w-full 
                transition-transform ease-in-out'>
                  <img 
                    src={item.strMealThumb !== null ? item.strMealThumb : '/images/Apple animated.gif'}
                    alt={item.strMeal}
                    className='rounded-2xl mb-4 w-full h-40 object-cover'
                  />
                  <div className='flex mb-4 justify-between mx-auto'>
                    <h3 className='font-bold'>{item.strMeal}</h3>
                  </div>
                  <p className='text-sm text-gray-700 line-clamp-3'>{item.strInstructions}</p>
                </div>
              ))}
            </div>

          {/* <button
            className='text-white bg-amber-600 hover:bg-amber-900 rounded-2xl px-2 py-1 mt-4'
            onClick={() => {
              dispatch(clearRecipe())
              setRecipe('')
            }}
          >
            Clear
          </button> */}
        </div>
      )}
      </div>
    </>
  )
}

export default App
