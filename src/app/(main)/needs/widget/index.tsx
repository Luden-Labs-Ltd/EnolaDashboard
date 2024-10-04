"use client";
import "@styles/pages/needs.scss";
import { useState } from "react";
import NeedsTable from "../feauture/NeedsTable";
import NeedsOnboarding from "../feauture/Onboarding";

function NeedsContent() {
  const [showFirstEnter, setShowFirstEnter] = useState(true)

  const [categories, setCategories] = useState([])


  if (showFirstEnter) {
    return <NeedsOnboarding onComplete={() => setShowFirstEnter(false) } />;
  }

  return (
    <div>
      <NeedsTable>
      </NeedsTable>
    </div>
  );
}

export default NeedsContent;
