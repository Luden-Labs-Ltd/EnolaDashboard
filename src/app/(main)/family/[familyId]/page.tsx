"use client";
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const params = useParams()
  const familyId = params.familyId;
  
  return <p>family: {familyId}</p>
}