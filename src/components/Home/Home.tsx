import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { createBoughtItemDTO } from './domain/home-model';

function Home() {
  //const [count, setCount] = useState(0)
  const [recipe, setRecipe] = useState<string>('');
  // const dispatch = useDispatch<typeof import('../../redux/store').store.dispatch>();
  const recipeData = useSelector((state: any) => state.app.recipes);
  const status = useSelector((state: { app: { status: string } }) => state.app.status);
  const [filteredData, setFilteredData] = useState<any[] | false>(false);
  const [boughtItems, setBoughtItems] = useState<any[]>([]);
  const [savedData, setSavedData] = useState<any[]>([]);
  //const [quantity, setQuantity] = useState<string>('');

  // const error = useSelector((state: { app: { error: string } }) => state.app.error);

  useEffect(() => {
    
    const saveData = sessionStorage.getItem("savedData");
    if(saveData){
      setSavedData(JSON.parse(saveData));
    } else {
    //   alphabet.split('').forEach((letter) => {
    //     if (letter === '') {
    //       return;
    //     } else {
    //       dispatch(fetchRecipes(letter));
    //     }
    //   });
    //   sessionStorage.setItem("savedData", JSON.stringify(recipeData));
    //   setSavedData(recipeData);
    //   console.log(recipeData);
       
        const fetchData = async () => {
        try {
          // map returns an array of promises
          // const promises = alphabet.split('').map(async (letter) => {
          //   const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
          //   const data = await res.json();
          //   return data.meals || [];
          // });
  
          // Wait for all to finish
          // const results = await Promise.all(promises);
  
          // Flatten the array of arrays
          // const combined = results.flat();
  
            const res = await fetch("https://recipe-app-backend-4.onrender.com/vegetable");
            const data = await res.json();

          // Save in state
          setSavedData(data);
          sessionStorage.setItem("savedData", JSON.stringify(data))
          return data;
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };
      fetchData(); 
    }

    const boughtitems = localStorage.getItem("boughtItems");
    if(boughtitems){
      setBoughtItems(JSON.parse(boughtitems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("boughtItems", JSON.stringify(boughtItems));
  }, [boughtItems]);

  const filterData = () => {
    if(recipeData && recipeData.length > 0) {
      const filtered = recipeData.filter((item: any) => (
        item.strMeal.toLowerCase().includes(recipe.toLowerCase())
      ));
      setFilteredData([]);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  // const sendRecipesToAPI = () => {
  //   //const recipeDTOs = boughtItems.map((item: any) => createRecipeDTO(item.strMeal));
  //   const recipeDTOs = boughtItems.pop();
  //   fetch('http://localhost:5000/milestoneMDM',{
  //       method : 'POST',
  //       headers : {
  //         'Content-Type' : 'application/json',
  //         'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJQUk9KRUNUX0NSRUFUT1IiLCJBTExPV0VEX0VDSSIsIlVTRVIiLCJBRE1JTiIsIkFMTE9XRURfTlBNUyJdLCJpZCI6IjJkNTRiMmViLTA4ODctNGQyMC05YjhiLTliMzFlMzEzNDQ0MCIsInN1YiI6InJhbmRvbkBnbWFpbC5jb20iLCJpYXQiOjE3NTg5MzcxMDEsImV4cCI6MTc1ODk0MDcwMX0.v4Wm1BeBCkQ4NafPUF8QF5fI_mnZR_248sS-BpqMIn8'
  //       },
  //       body: JSON.stringify(recipeDTOs),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Response from API:',data)
  //       })
  //       .catch((error) => {
  //         console.error('Error in sending bought recipes')
  //       })
  // };

 
  return (
    <>
      <h2 className='text-xl text-center mt-20 font-bold'>FOOD RECIPE APP</h2>
      <div className='container mx-auto px-4 grid justify-center items-center gap-10 mt-10'>
      <div className='card flex flex-wrap justify-center bg-gray-200 rounded-2xl p-4 w-full max-w-4xl mx-auto'>
        <input
          type='text'
          id='search'
          value={recipe}
          className='bg-gray-300 px-2 py-1 rounded-2xl w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4 
          focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
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
          className='text-white bg-green-600 hover:bg-green-900 rounded-2xl px-2 py-1 
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
          className='text-white bg-green-600 hover:bg-green-900 rounded-2xl px-2 py-1 ml-2'
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
      {status === 'pending' && <img src='/images/Apple animated.gif' alt='loading' className='w-20 h-20 rounded-2xl mx-auto' />}
      {status === 'rejected' && <p className='text-red-600 text-center'>No data found</p>}
      {status === 'fulfilled' && recipeData === null ? (
        <p className='text-red-600 text-center'>
          Sorry, we could not find any recipe for you!
        </p>
      ) : (
        <div className='card bg-gray-200 rounded-2xl p-5 w-full max-w-6xl mx-auto'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {((filteredData) ? filteredData : savedData ).map((item: any) => (
                <div  
                  className='bg-gray-300 hover:bg-green-50 hover:scale-105 rounded-2xl p-4 w-full 
                  transition-transform ease-in-out shadow-md' key={item.id}>
                  <NavLink
                    to={`/recipe/${item.id}`} 
                    key={item.id} 
                   >
                    <img 
                      src={item.vegetableImage !== null ? item.vegetableImage : '/images/placeholder-image.png'}
                      alt={item.vegetableName}
                      className='rounded-2xl mb-4 w-full h-40 object-cover'
                    />
                    <h3 className='font-bold mb-2'>{item.vegetableName}</h3>
                    <div className='flex items-center mb-2'>
                      <h2>Price : </h2>
                      <h2 className='font-semibold items-center ml-2'>{item.price}</h2>
                    </div>
                  </NavLink>
                  <input
                    type='text'
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    className='bg-white-300 px-2 rounded-2xl w-full mb-2 border border-green-400 focus:border-green-600
                    focus:outline-none focus:ring-2 focus:ring-green-600'
                    placeholder="Enter quantity in grams"
                    //onChange={(e) => (e.target.value)}
                  ></input>
                  <button 
                    className='bg-green-600 hover:bg-green-900 text-white rounded-2xl px-2 py-1 w-full'
                    id={`add-to-cart-${item.id}`}
                    onClick={() => {
                      if(boughtItems.includes(item)){
                        alert(`You have already added "${item.vegetableName}" to cart!`);
                      } else {
                        // const quantityInput = document.getElementById(`quantity-${item.idMeal}`);
                        // if(quantityInput === null || quantityInput.nodeValue === ''){
                        //   alert(`Not valid`);
                        // }

                        // const input = document.querySelector(`input[id="quantity-${item.idMeal}"]`);
                        // const quantity = input?.nodeValue;

                        // const input = document.getElementById(`quantity-${item.idMeal}`);
                        // const quantityValue = input.value.trim();

                        // if(input){
                        //   alert(`you have entered ${quantity}`);
                        // } else {

                          const quantityValue = (document.getElementById(`quantity-${item.id}`) as HTMLInputElement | null)?.value?.trim();
                          const quantityNumber = quantityValue ? parseInt(quantityValue, 10) : 100;

                          const boughtItem = createBoughtItemDTO(item, 100, quantityNumber);
                          //console.log(boughtItem);
                          setBoughtItems([...boughtItems, boughtItem]);

                          //document.cookie = `cart=${JSON.stringify(boughtItems)}; path[]=/; max-age=86400`; // Cookie expires in 1 day
                          const addToCartButton = document.getElementById(`add-to-cart-${item.id}`);
                          if (addToCartButton) {
                            addToCartButton.innerText = 'Added';
                          }
                          alert(`Added "${item.vegetableName}" to cart!`);
                          //sendRecipesToAPI();
                        }
                      //}
                        //console.log(boughtItems);
                      }
                    }
                    >
                      Add to cart
                  </button>
                </div>
              ))}
            </div>
        </div>
      )}
      </div>
    </>
  )
}

export default Home;
