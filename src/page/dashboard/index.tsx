"use client";
import React from "react";
import CardList from "./ui/dashboard-card-list";
import { CharWithFilters } from "features/char-with-filters";
import { AnalyticsData, AnalyticsStoreProvider } from "entities/analitycs";

interface DashboardProps {
  data: AnalyticsData | null;
}

export default function Dashboard({ data: initialData }: DashboardProps) {
  return (
    <AnalyticsStoreProvider analyticsData={initialData}>
      <main>
        <CardList />
        <CharWithFilters />
      </main>
    </AnalyticsStoreProvider>
  );
}
