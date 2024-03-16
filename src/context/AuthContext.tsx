//we need to import some utilities for creating context from react
import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types'
import { createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

//need to define what an empty user looks like
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
}
//declare initiate auth state
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {}, //placeholder function
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
} //to know if we have a logged in user at all times

//declare our context
const AuthContext = createContext<IContextType>(INITIAL_STATE)

//Call this component AuthProvider because it wraps our entire app and provides the context
//every context needs to have children because it wraps the entire app and displays whatever is in it
//define children
const AuthProvider = ({children} : {children: React.ReactNode}) => { //what to do with this
  //we want to define the state of the user
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  //set state to be the initial user
  //set type to be IUser - so TypeScript knows that our user will look like
  //we need states for loading
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false) 
  const navigate = useNavigate() //initialise

  const checkAuthUser = async () => {
    try {
      //this is a funciton we'll create directly in appwrite
      //better not to destructure values in this case
      //const { $id, name, username, email, imageUrl, //bio, } = await getCurrentUser()
      const currentAccount = await getCurrentUser()

      //could have destructured all these values above
      
      if(currentAccount) {
        setUser({ //don't even have to say the name
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
          

        })
        setIsAuthenticated(true)
        return true
      }
      return false
      //don't have access to the entire current account
      /*
      if($id) {
      //      if(currentAccount) { //dont' even have to say the name
        setUser({
          id: $id,  
          name,
          username,
          email,
          imageUrl,
          bio
        })
      }*/
    } catch(err) {
      console.log(err)
      return false;
    } finally {
        setIsLoading(false)
    }
  };

  //this has to be called whenever we reload our page
  //define a new useEffect hook
  //that has a function and a dependency array
  //meaning it's only going to be called when the app reload
  useEffect(()=> {
    if(
      localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null
    ) navigate('/sign-in')//go back to sign in screen 
    //when we reload the page - check
    checkAuthUser()
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (//we need to import some utilities for creating context from reactturn

    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext