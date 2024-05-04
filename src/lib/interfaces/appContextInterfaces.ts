import { Dispatch, SetStateAction } from "react";
import { Display } from "./ApiResponse";

export interface UserCredentials {
  email: string;
  token: string;
  isLogged: boolean;


}

export interface Filters {
  page: number,
  perPage: number,
  name: string,
  type: string;
}

export interface AppContextValues {
  userCredentials: UserCredentials
  saveCredentials: (value: UserCredentials) => void,
  filters: Filters,
  setFilters: Dispatch<SetStateAction<Filters>>,
  showDeleteDialog: boolean;
  setShowDeleteDialog: Dispatch<SetStateAction<boolean>>,
  activeDisplay: Display | null,
  setActiveDisplay: Dispatch<SetStateAction<Display | null>>
}