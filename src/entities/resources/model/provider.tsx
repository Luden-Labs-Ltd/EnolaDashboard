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
import { ResourcesType } from ".";

type ResourcesContextState = {
  resources: ResourcesType[];
  programId: string | null;
};

type ResourcesProviderValue = {
  resources: ResourcesType[];
  programId: string | null;
};

const ResourcesContext = createContext<{
  resourcesState: ResourcesContextState;
  setData: Dispatch<SetStateAction<ResourcesContextState>>;
} | null>(null);

export const ResourcesStoreProvider: React.FC<
  PropsWithChildren<ResourcesProviderValue>
> = ({ resources, programId, children }) => {
  const [resourcesState, setResourcesState] = useState<ResourcesContextState>({
    resources: resources,
    programId: programId,
  });

  useEffect(() => {
    setResourcesState((prev) => ({ ...prev, resources: resources }));
  }, [resources]);

  return (
    <ResourcesContext.Provider
      value={{
        resourcesState: resourcesState,
        setData: setResourcesState,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export const useResourcesStore = () => {
  const resourcesContext = useContext(ResourcesContext);

  if (!resourcesContext) {
    throw new Error(
      "resourcesContext has to be used within <ResourcesStoreProvider>"
    );
  }
  const { resourcesState, setData } = resourcesContext;

  return {
    resourcesState,
  };
};
