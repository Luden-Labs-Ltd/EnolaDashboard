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
};

type ResourcesProviderValue = {
  resources: ResourcesType[];
};

const ResourcesContext = createContext<{
  resourcesState: ResourcesContextState;
  setData: Dispatch<SetStateAction<ResourcesContextState>>;
} | null>(null);

export const ResourcesStoreProvider: React.FC<
  PropsWithChildren<ResourcesProviderValue>
> = ({ resources, children }) => {
  const [resourcesState, setResourcesState] = useState<ResourcesContextState>({
    resources: resources,
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
