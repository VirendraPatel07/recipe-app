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
            <div className='fixed top-0 flex items-center justify-between bg-gray-200 w-full p-2'>
                <div>
                    <img src='/images/Ladyfinger.jpeg' alt='logo' className='w-20 h-20 rounded-2xl' />
                </div>
                {screenWidth > 900 ? (
                    <div id='header-menus' className='flex items-center gap-5'>
                        <h1 className='text-2xl'>Home</h1>
                        <h1 className='text-2xl'>About</h1>
                        <h1 className='text-2xl'>Contact</h1>
                        <h1 className='text-2xl'>Privacy Policy</h1>
                        <h1 className='text-2xl'>Terms of Service</h1>
                        <h1 className='text-2xl'>Help</h1>
                    </div>
                ) : (
                    <button
                        onClick={toggleSidebar}
                        className='text-2xl bg-gray-300 p-2 rounded-md'
                    >
                        ☰
                    </button>
                )}
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className={`fixed top-0 right-0 w-64 bg-gray-100 text-black p-5 z-50`}>
                    <button
                        onClick={toggleSidebar}
                        className='text-xl bg-gray-300 p-2 rounded-md mb-4'
                    >
                        ✕
                    </button>
                    <ul className='flex flex-col gap-4'>
                        <li className='text-xl'>Home</li>
                        <li className='text-xl'>About</li>
                        <li className='text-xl'>Contact</li>
                        <li className='text-xl'>Privacy Policy</li>
                        <li className='text-xl'>Terms of Service</li>
                        <li className='text-xl'>Help</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default Header;