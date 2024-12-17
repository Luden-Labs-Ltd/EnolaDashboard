"use client";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { CategoryType } from "entities/category";
import { ResourcesStoreProvider, ResourcesType } from "entities/resources";
import { AddResources } from "features/add-resources";
import SearchPanel from "features/search-panel";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";
import { FilterByCategories } from "./ui/FilterByCategories";
import { ResourcesList } from "./ui/ResourcesList";

interface ResourcesProps {
  categories: CategoryType[];
  resources: ResourcesType[];
  programId: string | null;
}

export default function Resources({
  categories,
  resources,
  programId,
}: ResourcesProps) {
  return (
    <main>
      <ResourcesStoreProvider resources={resources} programId={programId}>
        <SearchPanel searchParamName="resource_name">
          <Row>
            <AddResources categories={categories} />
          </Row>
        </SearchPanel>
        <FilterByCategories categories={categories} />
        <ResourcesList />
      </ResourcesStoreProvider>
    </main>
  );
}
