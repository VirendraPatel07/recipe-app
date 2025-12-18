import { useState } from "react";

function login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const loginAttempt = () => {
        console.log('Login attempted');
        
    }

    return(
        <div>
            <h1 className='text-center mt-25'>Login Page</h1>
            <div className='container justify-center items-center mx-auto px-10 gap-10'>
                <div className='card justify-center bg-gray-200 rounded-2xl p-4 w-full max-w-md mx-auto mt-10'>
                    <form className='w-full max-w-sm gap-4 mx-auto'>
                        <h2>Enter email</h2>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email here'
                            className='w-full p-2 mt-2 mb-4 border border-gray-500 rounded-2xl'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>  
                        <h2>Enter password</h2>
                        <input 
                            type='password'
                            id='password'
                            placeholder='Enter your password here'
                            className='w-full p-2 mt-2 mb-4 border border-gray-500 rounded-2xl'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <button 
                            type='submit'
                            id='login-button'
                            className='bg-green-600 hover:bg-green-900 text-white rounded-2xl px-4 py-2 w-full'
                            onSubmit={() => {
                                // Handle login logic here
                                loginAttempt();
                                }
                            }
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default login;