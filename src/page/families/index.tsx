"use client"
import { FamiliesTable } from "@widgets/FamiliesTable";
import { FamilyType } from "entities/families";
import React from "react";

interface FamiliesProps {
  families: FamilyType[];
}
const Families: React.FC<FamiliesProps> = ({families}) => {
  
  return (
    <div>
      <FamiliesTable families={families}/>
    </div>
  );
};

export default Families;
