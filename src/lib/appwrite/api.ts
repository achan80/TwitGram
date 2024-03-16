//TypeScript thing - define new user Interface
import { ID, Query } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';


//with two simple functions - we have a connection to the database
//in types folder
export async function createUserAccount(user: INewUser) {
  //we can connect to appwrite authentication functionalities to create this user
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);//a service that appwrite supplies

    const newUser = await saveUserToDB({ //pass in an object that has all of these properties
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,

    });
    return newUser
  } catch (error) {
    console.log(error)
  }
}

export async function saveUserToDB(user: { //destructure
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string; //optional ?
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )
    return newUser;
  } catch (err) {
    console.log(err)
  }
}

//created appwrite function that is being used by react-query
export async function signInAccount(user: {
  email: string,
  password:string,
}) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password) //utility provided by appwrite

    return session
  } catch(error) {
    console.log(error)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    if(!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      //then pass what we're trying to fetch
      //Query of type array
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error

    return currentUser.documents[0]
  } catch(err) {
    console.log(err)
  }
}