"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { NotesType } from "./types";

type NotesContextState = {
  notes: NotesType[];
  activeNotesId: NotesType["id"];
  activeNoteMessage: NotesType["body"];
  newNote: NotesType | null;
};

type NotesProviderValue = {
  notes: NotesType[] | null;
};

const NotesContext = createContext<{
  notesState: NotesContextState;
  setData: Dispatch<SetStateAction<NotesContextState>>;
} | null>(null);

export const NotesStoreProvider: React.FC<
  PropsWithChildren<NotesProviderValue>
> = ({ notes, children }) => {
  const [noteState, setNoteState] = useState<NotesContextState>({
    notes: notes ?? [],
    activeNotesId: "",
    activeNoteMessage: "",
    newNote: null,
  });

  useEffect(() => {
    if (notes) {
      setNoteState((prev) => ({...prev, notes}) )
    }
  }, [notes])
  return (
    <NotesContext.Provider
      value={{
        notesState: noteState,
        setData: setNoteState,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNoteStore = () => {
  const notesContext = useContext(NotesContext);

  if (!notesContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }
  const { notesState, setData } = notesContext;

  const setEditNoteId = (id: NotesType["id"]) => {
    setData((prev) => ({ ...prev, activeNotesId: id, newNote: null }));
  };

  const setEditMessage = (message: NotesType["body"]) => {
    setData((prev) => ({ ...prev, activeNoteMessage: message }));
  };

  const deleteNote = (id: NotesType["id"]) => {
    const filteredNotes = notesState.notes.filter((note) => note.id !== id);
    setData((prev) => ({ ...prev, notes: filteredNotes, activeNotesId: "" }));
  };

  const addNote = () => {
    const id = `${Math.random()}-${Math.random()}-${Math.random()}`;
    const todayDate = new Date().toISOString();

    setData((prev) => ({
      ...prev,
      activeNotesId: id,
      activeNoteMessage: "",
      newNote: {
        id,
        created_at: todayDate,
        body: prev.activeNoteMessage,
      },
    }));
  };

  const saveChanges = (id: NotesType["id"]) => {
    const updatedNote = notesState.notes.map((note) => {
      if (note.id === id) {
        return { ...note, body: notesState.activeNoteMessage };
      }
      return { ...note };
    });
    setData((prev) => ({ ...prev, notes: updatedNote, activeNotesId: "" }));
  };

  const getNote = (): NotesType => {
    return {
      id: notesState.activeNotesId,
      created_at: notesState.newNote?.created_at ?? new Date().toISOString(),
      body: notesState.activeNoteMessage,
    };
  };

  const saveNewNote = (noteId: string) => {
    const newNote = {
      id: noteId,
      created_at: notesState.newNote?.created_at ?? new Date().toISOString(),
      body: notesState.activeNoteMessage,
    };
    const updatedNote = [newNote, ...notesState.notes];
    setData((prev) => ({
      ...prev,
      notes: updatedNote,
      activeNotesId: "",
      activeNoteMessage: "",
      newNote: null,
    }));
  };

  const close = () => {
    setData((prev) => ({
      ...prev,
      activeNoteMessage: "",
      activeNotesId: "",
      newNote: null,
    }));
  };

  return {
    notesState,
    setEditNoteId,
    saveChanges,
    deleteNote,
    setEditMessage,
    addNote,
    getNote,
    saveNewNote,
    close,
  };
};
