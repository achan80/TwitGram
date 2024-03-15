//Our primary router component
import { Routes, Route } from 'react-router-dom';

import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';


const App = () => {
  return (
    <main className='flex h-screen'> {/* We can use semantic tags */}
      <Routes>
        {/* Public Routes - routes that everyone will be able to see - sign up and sign in */} 
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        {/* Private Routes - routes you can only see when you sign in */}
          <Route index element={<Home />}/>
      </Routes>
      
    </main>
    
  )
}

export default App