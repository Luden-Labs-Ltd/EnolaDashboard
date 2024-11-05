import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import React from "react";
import { NotesStoreProvider } from "./model/provider";
import { NotesList } from "./ui/NotesList";
import { NoteAction } from "./ui/NoteAction";

export const Notes = () => {
  const notesItems = [
    {
      id: "1",
      date: Date.UTC(2000, 8, 12, 14, 0, 0, 0),
      message: `
        Design a user-friendly interface for adding new resources.
        Required fields for new resources include: service name, organization, contact person, terms of service,
        and contact information (phone/email). Design the display format for existing resource details.
      `,
    },
    {
      id: "2",
      date: Date.UTC(2001, 9, 30, 13, 0, 0, 0),
      message: `Design a user-friendly interface for adding new resources. Required fields for new resources include.`,
    },
  ];

  return (
    <NotesStoreProvider notes={notesItems}>
      <Card backgroundColor="#FFF7DF">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <NoteAction/>
        </CardHeader>
        <CardContent padding="15px 16px">
          <NotesList />
        </CardContent>
      </Card>
    </NotesStoreProvider>
  );
};
