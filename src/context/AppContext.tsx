import React, { createContext, useState } from "react";
import { DEFAULT_APP_CONTEXT_VALUES } from "../lib/contants/appContextConstants";
import useLocalStorage from "../hooks/useLocalStorage";
import { USER_CREDENTILAS } from "../lib/contants";
import { AppContextValues, Display, UserCredentials } from "../lib/interfaces";

export const AppContext = createContext<AppContextValues>(
  DEFAULT_APP_CONTEXT_VALUES
);

interface Props {
  children: React.ReactNode;
}
export default function AppProvider({ children }: Props) {
  const [storedValues, setStoredValues] = useLocalStorage(
    USER_CREDENTILAS,
    DEFAULT_APP_CONTEXT_VALUES.userCredentials
  );
  const [userCredentials, setUserCredentials] = useState(storedValues);

  const saveCredentials = (values: UserCredentials) => {
    setStoredValues(values);
    setUserCredentials(values);
  };

  const [filters, setFilters] = useState(DEFAULT_APP_CONTEXT_VALUES.filters);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [activeDisplay, setActiveDisplay] = useState<Display | null>(null);
  
  return (
    <AppContext.Provider
      value={{
        userCredentials,
        saveCredentials,
        filters,
        setFilters,
        setShowDeleteDialog,
        showDeleteDialog,
        activeDisplay,
        setActiveDisplay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
