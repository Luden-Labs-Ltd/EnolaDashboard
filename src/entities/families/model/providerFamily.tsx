"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FullFamilyType } from ".";

type FamilyContextState = {
  family: FullFamilyType;
};

type FamilyProviderValue = {
  family: FullFamilyType;
};

const FamilyContext = createContext<{
  familyState: FamilyContextState;
  setData: Dispatch<SetStateAction<FamilyContextState>>;
} | null>(null);

export const FamilyStoreProvider: React.FC<
  PropsWithChildren<FamilyProviderValue>
> = ({ family, children }) => {
  const [familyState, setFamilyState] = useState<FamilyContextState>({
    family: family,
  });

  return (
    <FamilyContext.Provider
      value={{
        familyState: familyState,
        setData: setFamilyState,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyStore = () => {
  const familyContext = useContext(FamilyContext);

  if (!familyContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  const { familyState, setData } = familyContext;


  return {
    familyState,
  };
};
