import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import  store  from './redux/store'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Home from './components/Home/Home.tsx'
import Recipe from './components/Recipe/Recipe.tsx'
import Cart from './components/Cart/Cart.tsx'
import Login from './components/Login/Login.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'',
        element: <Home/>,
      },
      {
        path:'recipe/:id',
        element: <Recipe/>,
      },
      {
        path: 'about',
        element: <div className='text-center mt-20'>About</div>
      },
      { 
        path: 'contact',
        element: <div className='text-center mt-20'>Contact</div>
      },
      { 
        path: 'privacy-policy',
        element: <div className='text-center mt-20'>Privacy Policy</div>
      },
      {
        path: 'terms-of-service',
        element: <div className='text-center mt-20'>Terms of Service</div>
      },
      {
        path: 'help',
        element: <div className='text-center mt-20'>Help</div>
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'login',
        element: <Login/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
    <Provider store ={store}>
      <RouterProvider router={router}/>
    </Provider>
)
