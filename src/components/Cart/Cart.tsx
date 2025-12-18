import { useEffect, useState } from "react";

function Cart() {
    const [boughtItems, setBoughtItems] = useState<any[]>([]);
    const [totalAmmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const boughtitems = localStorage.getItem("boughtItems");
        if(boughtitems){
            setBoughtItems(JSON.parse(boughtitems));
        }
        console.log(boughtitems)
    }, []);
    

    return (
        <>
            <div className='container mx-auto px-4 grid justify-center items-center gap-10 mt-20'>
            <div className='card justify-center bg-gray-200 rounded-2xl p-4 w-full max-w-4xl mx-auto'>
                {boughtItems === null ? (
                    <p className='text-red-600 text-center'>
                        Sorry, Cart is empty
                    </p>
                ) : (
                    <div className='card flex flex-wrap bg-gray-200 rounded-2xl p-5 w-full max-w-6xl mx-auto'>
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {boughtItems.map((item: any) => (
                                <div className='bg-gray-300 hover:bg-green-50 hover:scale-105 rounded-2xl p-4 w-full transition-transform ease-in-out shadow-md'>
                                    <img 
                                        src={item.vegetableImage !== null ? item.vegetableImage : '/images/Ladyfinger.jpeg'} 
                                        alt={item.vegetableName}
                                        className='rounded-2xl mb-4 w-full h-40 object-cover'
                                    />
                                    <h3 className='font-bold justify-center mb-2'>{item.vegetableName}</h3>
                                    <div className='flex items-center'>
                                        <h2>Price : </h2>
                                        <h2 className='font-semibold items-center ml-2'> {item.price} Rs</h2>
                                    </div>
                                    <div className='flex items-center mb-2'>
                                        <h2>Quantity : </h2>
                                        <h2 className='font-semibold ml-2'>{item.quantity} g</h2>
                                    </div>
                                    <button
                                        className='bg-green-600 hover:bg-green-900 text-white rounded-2xl px-2 py-1 w-full'
                                        id={`remove-from-cart-${item.id}`}
                                        onClick={() => { 
                                            const updatedItems = boughtItems.filter(items => items.id !== item.id);  
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
                            <div className = 'col-span-full font-bold mt-4'>
                                Tentative Amount : {boughtItems.reduce((total, item) => total + (item.price * item.quantity) / 1000, 0)} Rs
                            </div>
                            <button className="bg-green-600 hover:bg-green-900 text-white rounded-2xl px-4 py-2 mt-4 w-full col-span-full">    
                                Place Order
                            </button>

                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    );
}

export default Cart;