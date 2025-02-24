import { ScrollArea } from "@components/shadowCDN/scroll-area";
import React from "react";
import { Note } from "../Note/Note";
import { useNoteStore } from "entities/notes";

export const NotesList = () => {
  const { notesState } = useNoteStore();
  const { notes, newNote } = notesState;

  return (
    <ScrollArea className="h-[160px] w-full px-5">
      <div className="flex flex-col gap-[20px]">
        {newNote ? (
          <Note
            key={newNote.id}
            id={newNote.id}
            date={newNote.created_at}
            message={newNote.body}
          />
        ) : null}
        {notes.length
          ? notes.map((action) => (
              <Note
                key={action.id}
                id={action.id}
                date={action.created_at}
                message={action.body}
              />
            ))
          : null}
      </div>
    </ScrollArea>
  );
};
