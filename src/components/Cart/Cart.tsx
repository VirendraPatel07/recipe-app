import { useEffect, useState } from "react";

function Cart() {
    const [boughtItems, setBoughtItems] = useState<any[]>([]);

    useEffect(() => {
        const boughtitems = localStorage.getItem("boughtItems");
        if(boughtitems){
            setBoughtItems(JSON.parse(boughtitems));
        }
    }, []);
    

    return (
        <>
            <div className='container mx-auto px-4 grid justify-center items-center gap-10 mt-20'>
            <div className='card flex flex-wrap justify-center bg-gray-200 rounded-2xl p-4 w-full max-w-4xl mx-auto'>
                {boughtItems === null ? (
                    <p className='text-red-600 text-center'>
                        Sorry, Cart is empty
                    </p>
                ) : (
                    <div className='card bg-gray-200 rounded-2xl p-5 w-full max-w-6xl mx-auto'>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {boughtItems.map((item: any) => (
                                <div className='bg-gray-300 hover:bg-green-50 hover:scale-105 rounded-2xl p-4 w-full transition-transform ease-in-out shadow-md'>
                                    <img 
                                        src={item.strMealThumb} 
                                        alt={item.strMeal}
                                        className='rounded-2xl mb-4 w-full h-40 object-cover'
                                    />
                                    <button
                                        className='bg-green-600 hover:bg-green-900 text-white rounded-2xl px-2 py-1 w-full'
                                        id={`remove-from-cart-${item.idMeal}`}
                                        onClick={() => { 
                                            const updatedItems = boughtItems.filter(item1 => item1.idMeal !== item.idMeal);  
                                            setBoughtItems(updatedItems);
                                            localStorage.setItem("boughtItems", JSON.stringify(updatedItems));    
                                            }
                                        }
                                    >
                                        Remove from Cart
                                    </button>
                                </div>                                   
                                ))     
                            }
                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    );
}

export default Cart;