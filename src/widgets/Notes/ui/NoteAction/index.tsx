import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { useNoteStore } from "@widgets/Notes/model/provider";
import React from "react";
import AddIcon from "shared/assets/AddIcon";
import CheckIcon from "shared/assets/CheckIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";

export const NoteAction = () => {
  const { notesState, deleteNote, saveChanges, addNote, saveNewNote } = useNoteStore();
  const { activeNotesId, newNote } = notesState;

  if (activeNotesId && !newNote) {
    return (
      <Row alignItems="center">
        <Button
          onClick={() => saveChanges(activeNotesId)}
          variant={"ghost"}
          size={"icon"}
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => deleteNote(activeNotesId)}
          variant={"ghost"}
          size={"icon"}
        >
          <DeleteIcon />
        </Button>
      </Row>
    );
  }
  return (
    <>
      {newNote ? (
        <Button onClick={saveNewNote} variant={"ghost"} size={"icon"}>
          <CheckIcon />
        </Button>
      ) : (
        <Button onClick={addNote} variant={"ghost"} size={"icon"}>
          <AddIcon />
        </Button>
      )}
    </>
  );
};
