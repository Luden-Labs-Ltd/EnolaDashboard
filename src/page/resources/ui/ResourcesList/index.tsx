import { useResourcesStore } from "entities/resources";
import React from "react";
import { Resource } from "../Resource/Resource";
import { ScrollArea } from "@components/shadowCDN/scroll-area";

export const ResourcesList = () => {
  const { resourcesState } = useResourcesStore();
  const { resources } = resourcesState;

  return (
    <ScrollArea className="h-[70vh]">
      <div className="flex flex-wrap gap-[32px]">
        {resources.map((resource) => {
          return <Resource key={resource.id} resource={resource} />;
        })}
      </div>
    </ScrollArea>
  );
};
