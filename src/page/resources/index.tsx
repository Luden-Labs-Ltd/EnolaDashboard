"use client";
import Row from "@components/Row";
import { CategoryStoreProvider, CategoryType } from "entities/category";
import { ResourcesStoreProvider, ResourcesType } from "entities/resources";
import { AddResources } from "features/add-resources";
import SearchPanel from "features/search-panel";
import { FilterByCategories } from "./ui/FilterByCategories";
import { ResourcesList } from "./ui/ResourcesList";
import ImportResourcesModal from "features/import-resource";

interface ResourcesProps {
  categories: CategoryType[];
  resources: ResourcesType[];
  maxResourceCount: number;
  maxTaskCount: number;
  isRTL: boolean;
}

export default function Resources({
  categories,
  resources,
  maxResourceCount,
  maxTaskCount,
  isRTL,
}: ResourcesProps) {
  return (
    <main>
      <ResourcesStoreProvider resources={resources}>
        <SearchPanel searchParamName="resource_name">
          <Row>
            <AddResources categories={categories} />
            <ImportResourcesModal />
          </Row>
        </SearchPanel>
        <CategoryStoreProvider
          maxResourceCount={maxResourceCount}
          maxTaskCount={maxTaskCount}
          currentCategory={categories[0]}
          categories={categories}
        >
          <FilterByCategories />
          <ResourcesList isRTL={isRTL} />
        </CategoryStoreProvider>
      </ResourcesStoreProvider>
    </main>
  );
}
