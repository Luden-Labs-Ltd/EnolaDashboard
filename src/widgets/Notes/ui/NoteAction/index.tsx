import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { useToast } from "@hooks/use-toast";
import { createNotes, useNoteStore } from "entities/notes";
import { deleteNotes, editNotes } from "entities/notes/actions";
import React from "react";
import AddIcon from "shared/assets/AddIcon";
import CheckIcon from "shared/assets/CheckIcon";
import DeleteIcon from "shared/assets/DeleteIcon";
import EditIcon from "shared/assets/EditIcon";
import { isActionError } from "shared/error/api";

interface INotesAction {
  familyId: number | string;
}

export const NoteAction: React.FC<INotesAction> = ({ familyId }) => {
  const { notesState, deleteNote, saveChanges, addNote, saveNewNote, getNote } =
    useNoteStore();
  const toast = useToast();
  const { activeNotesId, newNote } = notesState;

  const createNewNote = () => {
    const currentNote = getNote();
    createNotes(familyId, {
      body: currentNote?.body ?? "",
      created_at: currentNote?.created_at ?? new Date().toISOString(),
    }).then((res) => {
      if (isActionError(res)) {
        return toast.error(`${res?.nextError}`);
      }
      saveNewNote(res?.id);
      return toast.success(`create successful`);
    });
  };

  const updateNote = () => {
    const currentNote = getNote();
    editNotes(familyId, activeNotesId, {
      body: currentNote?.body ?? "",
      created_at: new Date().toISOString(),
    }).then((res) => {
      if (isActionError(res)) {
        return toast.error(`${res?.nextError}`);
      }
      saveChanges(activeNotesId);
      return toast.success(`update successful`)
    });
  };

  const onDeleteNote = () => {
    deleteNotes(familyId, activeNotesId).then((res) => {
      if (isActionError(res)) {
        return toast.error(`${res?.nextError}`);
      }
      deleteNote(activeNotesId);
       return toast.success(`delete successful`);
    });
  };

  if (activeNotesId && !newNote) {
    return (
      <Row alignItems="center">
        <Button onClick={updateNote} variant={"ghost"} size={"icon"}>
          <EditIcon />
        </Button>
        <Button onClick={onDeleteNote} variant={"ghost"} size={"icon"}>
          <DeleteIcon />
        </Button>
      </Row>
    );
  }
  return (
    <>
      {newNote ? (
        <Button onClick={createNewNote} variant={"ghost"} size={"icon"}>
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
