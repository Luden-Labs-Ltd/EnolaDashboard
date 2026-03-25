"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FamilyType } from ".";

type FamiliesContextState = {
  families: FamilyType[];
  selectedFamilies: string[];
};

type FamiliesProviderValue = {
  families: FamilyType[];
};

const FamiliesContext = createContext<{
  familiesState: FamiliesContextState;
  setData: Dispatch<SetStateAction<FamiliesContextState>>;
} | null>(null);

export const FamiliesStoreProvider: React.FC<
  PropsWithChildren<FamiliesProviderValue>
> = ({ families, children }) => {
  const [familiesState, setFamiliesState] = useState<FamiliesContextState>({
    families: families,
    selectedFamilies: [],
  });

  useEffect(() => {
    setFamiliesState((prev) => ({...prev, families: families}))
  }, [families])

  return (
    <FamiliesContext.Provider
      value={{
        familiesState: familiesState,
        setData: setFamiliesState,
      }}
    >
      {children}
    </FamiliesContext.Provider>
  );
};

export const useFamiliesStore = () => {
  const familiesContext = useContext(FamiliesContext);

  if (!familiesContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  const { familiesState, setData } = familiesContext;

  const toggleSelectedFamilies = (familyId: string) => {
    const isFamilyAlreadySelect = familiesState.selectedFamilies.includes(familyId);

    if (isFamilyAlreadySelect) {
      const filteredSelectedFamilies = familiesState.selectedFamilies.filter((currentId) => currentId !== familyId)
      return setData((prev) => ({ ...prev, selectedFamilies: filteredSelectedFamilies }));
    }
    const newSelectedFamilies = [...familiesState.selectedFamilies, familyId]
    setData((prev) => ({ ...prev, selectedFamilies: newSelectedFamilies }));
  };

  const toggleMainSelect = () => {
    const isIndeterminate = familiesState.selectedFamilies.length > 0 && familiesState.selectedFamilies.length !== familiesState.families.length
    const isChecked = familiesState.selectedFamilies.length === familiesState.families.length

    if (isIndeterminate || isChecked) {
      return setData((prev) => ({...prev, selectedFamilies: []}));
    }
    const selectedFamilies = familiesState.families.map((family) => family.id)
    return setData((prev) => ({...prev, selectedFamilies: selectedFamilies}));
  };

  return {
    familiesState,
    toggleSelectedFamilies,
    toggleMainSelect,
  };
};
