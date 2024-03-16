//TypeScript thing - define new user Interface
import { ID } from 'appwrite'
import { INewUser } from "@/types";
import { account } from './config';

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

    return newAccount;
  } catch (error) {
    console.log(error)
  }
}