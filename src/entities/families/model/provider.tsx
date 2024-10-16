"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
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

  // const deleteSelectedTasks = () => {
  //   const currentSelectedTasks = tasksState.selectedTasks

  //   if (!currentSelectedTasks.length) {
  //     return
  //   }

  //   const newTasks = tasksState.tasks.filter((task) => {
  //     return !currentSelectedTasks.includes(task.id)
  //   })
  //   const activeTasks = newTasks.filter((task) => task.active);

  //   setData((prev) => ({ ...prev, tasks: newTasks,  selectedTasks: [], activeTasks }));
  // };


  return {
    familiesState,
    toggleSelectedFamilies,
  };
};
