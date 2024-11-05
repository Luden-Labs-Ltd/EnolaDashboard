import { ScrollArea } from "@components/shadowCDN/scroll-area";
import React from "react";
import { Note } from "../Note/Note";
import { useNoteStore } from "@widgets/Notes/model/provider";

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
            date={newNote.date}
            message={newNote.message}
          />
        ) : null}
        {notes.length
          ? notes.map((action) => (
              <Note
                key={action.id}
                id={action.id}
                date={action.date}
                message={action.message}
              />
            ))
          : null}
      </div>
    </ScrollArea>
  );
};
