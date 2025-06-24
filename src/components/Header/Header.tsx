import { NavLink } from 'react-router-dom';

// function Header() {
//     return (
//         <>
//             <div className='flex flex-wrap items-center justify-between bg-gray-200 w-full'>
//                 <div>
//                     <img src='../../public/images/Ladyfinger.jpeg' alt='logo' className='w-20 h-20 rounded-2xl p-2' />
//                 </div>
//                 {`${window.innerWidth} > 640px` ? 
//                 (
//                     <div className='flex flex-wrap items-center justify-center gap-5 px-5'>
//                         <h1 className='text-2xl'>Home</h1>
//                         <h1 className='text-2xl'>About</h1>
//                         <h1 className='text-2xl'>Contact</h1>   
//                         <h1 className='text-2xl'>Privacy Policy</h1>
//                         <h1 className='text-2xl'>Terms of Service</h1>
//                     </div>
//                 ) : (
//                     <img src='../../public/images/Ladyfinger.jpeg' alt='logo' className='w-20 h-20 rounded-2xl p-2' />
//                 )}
//             </div>
//         </>
//     )
// }

// export default Header;

import { useState, useEffect } from 'react';

function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className='fixed top-0 flex items-center justify-between bg-gray-200 w-full p-2 z-10'>
                <div>
                    <img src='/images/Ladyfinger.jpeg' alt='logo' className='w-10 h-10 rounded-xl' />
                </div>
                {screenWidth > 900 ? (
                    <ul className='flex items-center gap-5'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                        <li><NavLink to='/privacy-policy'>Privacy Policy</NavLink></li>
                        <li><NavLink to='/terms-of-service'>Terms of Service</NavLink></li>
                        <li><NavLink to='/help'>Help</NavLink></li>
                    </ul>
                ) : (
                    <button
                        onClick={toggleSidebar}
                        className='bg-gray-300 p-1 rounded-md'
                    >
                        ☰
                    </button>
                )}
            </div>
            <div
                className={`fixed top-0 right-0 bg-gray-100 text-black p-5 z-50 rounded-2xl
                transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                <button
                    onClick={toggleSidebar}
                    className='bg-gray-300 p-1 rounded-md mb-4'
                >
                    ✕
                </button>
                <ul className='grid gap-2'>
                <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/contact'>Contact</NavLink></li>
                    <li><NavLink to='/privacy-policy'>Privacy Policy</NavLink></li>
                    <li><NavLink to='/terms-of-service'>Terms of Service</NavLink></li>
                    <li><NavLink to='/help'>Help</NavLink></li>
                </ul>
            </div>
        </>
    );
}

export default Header;