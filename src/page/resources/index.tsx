"use client";
import Row from "@components/Row";
import { CategoryStoreProvider, CategoryType } from "entities/category";
import { ResourcesStoreProvider, ResourcesType } from "entities/resources";
import { AddResources } from "features/add-resources";
import SearchPanel from "features/search-panel";
import { FilterByCategories } from "./ui/FilterByCategories";
import { ResourcesList } from "./ui/ResourcesList";

interface ResourcesProps {
  categories: CategoryType[];
  resources: ResourcesType[];
  programId: string | null;
  maxResourceCount: number;
  maxTaskCount: number;
}

export default function Resources({
  categories,
  resources,
  programId,
  maxResourceCount,
  maxTaskCount,
}: ResourcesProps) {
  return (
    <main>
      <ResourcesStoreProvider resources={resources} programId={programId}>
        <SearchPanel searchParamName="resource_name">
          <Row>
            <AddResources categories={categories} />
          </Row>
        </SearchPanel>
        <CategoryStoreProvider
          maxResourceCount={maxResourceCount}
          maxTaskCount={maxTaskCount}
          programId={programId}
          currentCategory={categories[0]}
          categories={categories}
        >
          <FilterByCategories />
          <ResourcesList />
        </CategoryStoreProvider>
      </ResourcesStoreProvider>
    </main>
  );
}
