import { useResourcesStore } from "entities/resources";
import React from "react";
import { Resource } from "../Resource/Resource";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { EmptyScreen } from "@components/EmptyScreen";

export const ResourcesList = ({ isRTL }: { isRTL: boolean }) => {
  const { resourcesState } = useResourcesStore();
  const { resources } = resourcesState;

  return (
    <ScrollArea className="h-[70vh]">
      {!resources.length ? (
        <EmptyScreen screenFor="resource" />
      ) : (
        <div className="flex flex-wrap gap-[32px] justify-start rtl:justify-end">
          {resources.map((resource) => {
            return <Resource key={resource.id} resource={resource} isRTL={isRTL} />;
          })}
        </div>
      )}
    </ScrollArea>
  );
};
