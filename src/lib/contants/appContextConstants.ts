import { AppContextValues } from "../interfaces";


export const DEFAULT_APP_CONTEXT_VALUES: AppContextValues = {
  userCredentials: {
    email: '',
    token: '',
    isLogged: false
  },
  /* setUserCredentials: () => { } */
  saveCredentials: () => { }
}