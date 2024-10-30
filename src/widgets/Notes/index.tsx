import { Card, CardContent, CardHeader, CardTitle } from "@components/Card";
import React from "react";
import { Note } from "./ui/Note/Note";
import { ScrollArea } from "@components/shadowCDN/scroll-area";
import { AddNote } from "features/add-note";

export const Notes = () => {
  const notesItems = [
    {
      id: 1,
      date: Date.UTC(2000, 8, 12, 14, 0, 0, 0),
      message: `
        Design a user-friendly interface for adding new resources.
        Required fields for new resources include: service name, organization, contact person, terms of service,
        and contact information (phone/email). Design the display format for existing resource details.
      `,
    },
    {
      id: 2,
      date: Date.UTC(2001, 9, 30, 13, 0, 0, 0),
      message: `Design a user-friendly interface for adding new resources. Required fields for new resources include.`,
    },
  ];

  return (
    <Card backgroundColor="#FFF7DF">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <AddNote/>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[130px] w-full">
          {notesItems.map((action) => (
            <Note key={action.id} date={action.date} message={action.message} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
