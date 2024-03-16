import { INewUser } from '@/types'
import { 
  useQuery, //for fetching the data
  useMutation, //mutations are for modifying the data
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query' //all the things we use from react query
import { createUserAccount, signInAccount } from '../appwrite/api'
//reason why we use it - simplify data fetching and mutation while getting all the benefits - such as caching, scroll and more out of the box

 //export our first mutation
 //we can use this mutation in our sigup form
 export const useCreateUserAccount = () => {
    return useMutation({ //returns a call to useMutation
      mutationFn: (user: INewUser) => createUserAccount(user) //initialised a new mutation function so react query knows what we're doing 
    })
 }


 export const useSignInAccount = () => {
    return useMutation({ //returns a call to useMutation
      mutationFn: (user: {
        email: string, 
        password: string
    }) => signInAccount(user) //uses method before creating it
    //create signInAccount in appwrite
    })
 }

 //we can repeat this with the other hook