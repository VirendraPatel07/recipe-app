import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import  store  from './redux/store'
import './index.css'
import App from './App.tsx'
import Header from './Header.tsx'
import Footer from './Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store ={store}>
      <Header />
      <App />
      <Footer />
    </Provider>
  </StrictMode>,
)
