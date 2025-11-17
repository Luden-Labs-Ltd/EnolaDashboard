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
  locale: string;
}

export default function Resources({
  categories,
  resources,
  maxResourceCount,
  maxTaskCount,
  locale,
}: ResourcesProps) {
  const isRTL = locale === "he" ? true : false;

  return (
    <main>
      <ResourcesStoreProvider resources={resources}>
        <SearchPanel searchParamName="resource_name">
          <Row>
            <AddResources categories={categories} />
            <ImportResourcesModal locale={locale} />
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
