import { AppContextValues } from "../interfaces";
import { PER_PAGE_VALUES } from "./sharedConstants";


export const DEFAULT_APP_CONTEXT_VALUES: AppContextValues = {
  userCredentials: {
    email: '',
    token: '',
    isLogged: false
  },
  saveCredentials: () => { },
  filters: {
    page: 1,
    perPage: PER_PAGE_VALUES[0],
    name: '',
    type: '',
  },
  setFilters: () => { },
  showDeleteDialog: false,
  setShowDeleteDialog: () => { }

}