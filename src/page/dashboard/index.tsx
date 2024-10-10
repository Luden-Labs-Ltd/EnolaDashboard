import React from "react";
import CardList from "./ui/dashboard-card-list";
import { CharWithFilters } from "features/char-with-filters";


export default function Dashboard() {
  return (
    <main>
      <CardList />
      <CharWithFilters />
    </main>
  );
}
