"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import React, { useEffect, useState } from "react";
import { NotesList } from "./ui/NotesList";
import { NoteAction } from "./ui/NoteAction";
import { useTranslations } from "next-intl";
import { getNotesById, NotesStoreProvider, NotesType } from "entities/notes";

interface INotes {
  familyId: number;
}
export const Notes: React.FC<INotes> = ({ familyId }) => {
  const t = useTranslations();
  const [data, setData] = useState<NotesType[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const notesItems = await getNotesById(familyId);
      if (!notesItems) {
        return;
      }
      setData(notesItems);
    };
    getData();
  }, [familyId]);

  return (
    <NotesStoreProvider notes={data}>
      <Card backgroundColor="#FFF7DF">
        <CardHeader>
          <CardTitle>{t("Common.notes")}</CardTitle>
          <NoteAction familyId={familyId}/>
        </CardHeader>
        <CardContent padding="15px 16px">
          <NotesList />
        </CardContent>
      </Card>
    </NotesStoreProvider>
  );
};
