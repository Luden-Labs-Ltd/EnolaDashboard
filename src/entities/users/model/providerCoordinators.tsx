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
import { CoordinatorType } from ".";

type CoordinatorsContextState = {
  coordinators: CoordinatorType[];
  selectedCoordinators: number[];
};

type CoordinatorsProviderValue = {
  coordinators: CoordinatorType[];
};

const CoordinatorsContext = createContext<{
  coordinatorsState: CoordinatorsContextState;
  setData: Dispatch<SetStateAction<CoordinatorsContextState>>;
} | null>(null);

export const CoordinatorsStoreProvider: React.FC<
  PropsWithChildren<CoordinatorsProviderValue>
> = ({ coordinators, children }) => {
  const [coordinatorsState, setCoordinatorsState] = useState<CoordinatorsContextState>({
    coordinators: coordinators,
    selectedCoordinators: [],
  });

  useEffect(() => {
    setCoordinatorsState((prev) => ({...prev, coordinators: coordinators}))
  }, [coordinators])

  return (
    <CoordinatorsContext.Provider
      value={{
        coordinatorsState: coordinatorsState,
        setData: setCoordinatorsState,
      }}
    >
      {children}
    </CoordinatorsContext.Provider>
  );
};

export const useCoordinatorsStore = () => {
  const coordinatorsContext = useContext(CoordinatorsContext);

  if (!coordinatorsContext) {
    throw new Error(
      "coordinatorsContext has to be used within <CoordinatorsContext.Provider>"
    );
  }
  const { coordinatorsState, setData } = coordinatorsContext;

  const toggleSelectedCoordinators = (familyId: number) => {
    const isFamilyAlreadySelect = coordinatorsState.selectedCoordinators.includes(familyId);

    if (isFamilyAlreadySelect) {
      const filteredSelectedFamilies = coordinatorsState.selectedCoordinators.filter((currentId) => currentId !== familyId)
      return setData((prev) => ({ ...prev, selectedCoordinators: filteredSelectedFamilies }));
    }
    const newSelectedFamilies = [...coordinatorsState.selectedCoordinators, familyId]
    setData((prev) => ({ ...prev, selectedCoordinators: newSelectedFamilies }));
  };

  const toggleMainSelect = () => {
    const isIndeterminate = coordinatorsState.selectedCoordinators.length > 0 && coordinatorsState.selectedCoordinators.length !== coordinatorsState.coordinators.length
    const isChecked = coordinatorsState.selectedCoordinators.length === coordinatorsState.coordinators.length

    if (isIndeterminate || isChecked) {
      return setData((prev) => ({...prev, selectedCoordinators: []}));
    }
    const selectedCoordinators = coordinatorsState.coordinators.map((coordinator) => coordinator.id)
    return setData((prev) => ({...prev, selectedCoordinators: selectedCoordinators}));
  };

  return {
    coordinatorsState,
    toggleSelectedCoordinators,
    toggleMainSelect,
  };
};
