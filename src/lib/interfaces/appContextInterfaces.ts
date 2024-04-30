import { Dispatch, SetStateAction } from "react";

export interface UserCredentials {
  email: string;
  token: string;
  isLogged: boolean;
}

export interface AppContextValues {
  userCredentials: UserCredentials
  // setCredentials: Dispatch<SetStateAction<UserCredentials>>
  saveCredentials: (value:UserCredentials) => void
}