function Footer(){
    return (
        <>
            <div className='flex flex-wrap items-center text-sm text-gray-700 justify-center bg-gray-200 p-5 w-full gap-10 mt-10 mx-auto'>
                <img src= '/images/Ladyfinger.jpeg' alt='logo' className='w-20 h-20 rounded-2xl' />
                <ul className='grid grid-cols-1 gap-2'>
                    <li className='font-bold'>Contact Us</li>
                    <li>Email : support@recipe.com</li>
                    <li>Phone : 0124-7553478</li>  
                </ul>
                <ul className='grid grid-cols-1 gap-2'>
                    <li className='font-bold'>About Us</li>
                    <li>About Recipe App</li>
                    <li>Privacy Policy</li> 
                </ul>
                <ul className='grid grid-cols-1 gap-2'>
                    <li className='font-bold'>Follow Us</li>
                    <li>Facebook</li>
                    <li>Instagram</li>                    
                </ul>
                <ul className='grid grid-cols-1 gap-2'>
                    <li>Made with ❤️ by Your Name</li>
                    <li>© 2025 Recipe App. All rights reserved.</li>
                </ul>
            </div>
        </>
    )
}

export default Footer;