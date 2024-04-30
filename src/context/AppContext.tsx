import React, { createContext, useState } from "react";
import { DEFAULT_APP_CONTEXT_VALUES } from "../lib/contants/appContextConstants";
import useLocalStorage from "../hooks/useLocalStorage";
import { USER_CREDENTILAS } from "../lib/contants";
import { AppContextValues } from "../lib/interfaces";

export const AppContext = createContext<AppContextValues>(
  DEFAULT_APP_CONTEXT_VALUES
);

interface Props {
  children: React.ReactNode;
}
export default function AppProvider({ children }: Props) {
  
  const [storedValues] = useLocalStorage(
    USER_CREDENTILAS,
    DEFAULT_APP_CONTEXT_VALUES.userCredentials
  );

  const [userCredentials, setUserCredentials] = useState(storedValues);

  return (
    <AppContext.Provider value={{ userCredentials, setUserCredentials }}>
      {children}
    </AppContext.Provider>
  );
}
