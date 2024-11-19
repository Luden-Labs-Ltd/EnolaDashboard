"use client";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { Category, CategoryType } from "entities/category";
import { ResourcesType } from "entities/resources";
import SearchPanel from "features/search-panel";
import React from "react";
import AddIcon from "shared/assets/AddIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";
import { Resource } from "./ui/Resource/Resource";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { AddResources } from "features/add-resources";

interface ResourcesProps {
  categories: CategoryType[];
  resources: ResourcesType[];
}

export default function Resources({ categories, resources }: ResourcesProps) {

  return (
    <main>
      <SearchPanel
        actions={
          <Row>
            <Button size={"icon"} variant={"ghost"}>
              <EditIcon />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <DeleteIcon />
            </Button>
            <AddResources/>
          </Row>
        }
      />
      <div className="flex flex-wrap gap-[4px] mb-9">
        <Category id={"all"} variant="chip" title={"all"} />
        {categories.map((category) => {
          return (
            <Category
              key={category.id}
              id={category.id}
              variant="chip"
              count={category.count}
              title={category.title}
            />
          );
        })}
      </div>
      <ScrollArea className="h-[690px]">
        <div className="flex flex-wrap gap-[32px]">
          {resources.map((resource) => {
            return <Resource key={resource.id} resource={resource} />;
          })}
        </div>
      </ScrollArea>
    </main>
  );
}
