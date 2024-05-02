import { AppContextValues } from "../interfaces";


export const DEFAULT_APP_CONTEXT_VALUES: AppContextValues = {
  userCredentials: {
    email: '',
    token: '',
    isLogged: false
  },
  saveCredentials: () => { },
  filters: {
    page: 1,
    perPage: 3,
    name: '',
    type: '',
  },
  setFilters: () => { }
}