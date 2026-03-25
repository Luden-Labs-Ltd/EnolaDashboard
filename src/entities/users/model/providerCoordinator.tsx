"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CoordinatorType } from ".";
import { CoordinatorApi } from "../api/types";
import { getCoordinatorById } from "../api";
import { convertSingleCoordinatorData } from "../lib/converter";

export type CoordinatorContextState = {
  coordinator: CoordinatorType;
  coordinatorApi: CoordinatorApi;
};

type CoordinatorProviderValue = {
  data: CoordinatorContextState;
};

const CoordinatorContext = createContext<{
  coordinatorState: CoordinatorContextState;
  setData: Dispatch<SetStateAction<CoordinatorContextState>>;
} | null>(null);

export const CoordinatorStoreProvider: React.FC<
  PropsWithChildren<CoordinatorProviderValue>
> = ({ data, children }) => {
  const [coordinatorState, setCoordinatorState] = useState<CoordinatorContextState>({
    coordinator: data.coordinator,
    coordinatorApi: data.coordinatorApi,
  });

  return (
    <CoordinatorContext.Provider
      value={{
        coordinatorState: coordinatorState,
        setData: setCoordinatorState,
      }}
    >
      {children}
    </CoordinatorContext.Provider>
  );
};

export const useCoordinatorStore = () => {
  const coordinatorContext = useContext(CoordinatorContext);

  if (!coordinatorContext) {
    throw new Error(
      "coordinatorContext has to be used within <CoordinatorContext.Provider>"
    );
  }
  const { coordinatorState, setData } = coordinatorContext;

  const refetchCoordinator = async (coordinatorId: number | string) => {
    const getData = async () => {
      const apiCoordinator = await getCoordinatorById(coordinatorId);
      if (!apiCoordinator) {
        return;
      }
      const data = convertSingleCoordinatorData(apiCoordinator);
      setData(data);
      return data
    };

    return await getData();
  };

  return {
    coordinatorState,
    refetchCoordinator,
  };
};
