//Our primary router component
import { Routes, Route } from 'react-router-dom';

import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';


const App = () => {
  return (
    <main className='flex h-screen'> {/* We can use semantic tags */}
      <Routes>
          <Route element={<AuthLayout />}>
            {/* Public Routes - routes that everyone will be able to see - sign up and sign in */} 
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>
          
          <Route element={<RootLayout />}>
            {/* Private Routes - routes you can only see when you sign in */}
            <Route index element={<Home />}/>
          </Route>
      </Routes>
      
    </main>
    
  )
}

export default App