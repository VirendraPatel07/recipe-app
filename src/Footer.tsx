function Footer(){
    return (
        <>
            <div className='flex flex-wrap items-center justify-center bg-gray-200 p-10 w-full gap-10 mt-10 mx-auto'>
                <img src= '../../public/images/Ladyfinger.jpeg' alt='logo' className='w-20 h-20 rounded-2xl' />
                <div className='grid grid-cols-1 gap-2'>
                    <h1 className='text-2xl font-bold'>Contact Us</h1>
                    <p className='text-xl'>Email : support@recipe.com</p>
                    <p className='text-xl'>Phone : 0124-7553478</p>  
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <h1 className='text-2xl font-bold'>About Us</h1>
                    <p className='text-xl'>About Recipe App</p>
                    <p className='text-xl'>Privacy Policy</p> 
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <h1 className='text-2xl font-bold'>Follow Us</h1>
                    <p className='text-xl'>Facebook</p>
                    <p className='text-xl'>Instagram</p>                    
                </div>
                <div className='grid grid-cols-1 gap-2'>
                    <p className='text-xl'>Made with ❤️ by Your Name</p>
                    <p className='text-xl'>© 2025 Recipe App. All rights reserved.</p>
                </div>

            </div>
        </>
    )
}

export default Footer;