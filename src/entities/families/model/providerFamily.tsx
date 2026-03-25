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
import { FamilyApi } from "../api/types";
import { getFamilyById } from "../api";
import { convertSingleFamilyData } from "../lib/converter";

export type FamilyContextState = {
  family: FullFamilyType;
  familyApi: FamilyApi;
};

type FamilyProviderValue = {
  data: FamilyContextState;
};

const FamilyContext = createContext<{
  familyState: FamilyContextState;
  setData: Dispatch<SetStateAction<FamilyContextState>>;
} | null>(null);

export const FamilyStoreProvider: React.FC<
  PropsWithChildren<FamilyProviderValue>
> = ({ data, children }) => {
  const [familyState, setFamilyState] = useState<FamilyContextState>({
    family: data.family,
    familyApi: data.familyApi,
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

  const refetchFamily = async (familyId: number | string) => {
    const getData = async () => {
      const apiFamily = await getFamilyById(familyId);
      if (!apiFamily) {
        return;
      }
      const data = convertSingleFamilyData(apiFamily);
      setData(data);
      return data
    };

    return await getData();
  };

  return {
    familyState,
    refetchFamily,
  };
};
