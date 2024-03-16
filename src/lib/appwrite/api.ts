//TypeScript thing - define new user Interface
import { ID } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

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