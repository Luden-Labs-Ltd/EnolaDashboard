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
  selectedCoordinators: string[];
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

  const toggleSelectedCoordinators = (coordinatorId: string) => {
    const isCoordinatorAlreadySelect = coordinatorsState.selectedCoordinators.includes(coordinatorId);

    if (isCoordinatorAlreadySelect) {
      const filteredSelectedCoordinators = coordinatorsState.selectedCoordinators.filter((currentId) => currentId !== coordinatorId)
      return setData((prev) => ({ ...prev, selectedCoordinators: filteredSelectedCoordinators }));
    }
    const newSelectedCoordinators = [...coordinatorsState.selectedCoordinators, coordinatorId]
    setData((prev) => ({ ...prev, selectedCoordinators: newSelectedCoordinators }));
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
