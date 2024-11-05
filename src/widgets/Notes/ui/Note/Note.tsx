import Row from "@components/Row";
import { format } from "date-fns";
import React, { useState } from "react";
import { EditArea } from "../EditArea/EditArea";
import { useNoteStore } from "@widgets/Notes/model/provider";

interface NoteProps {
  date: number;
  id: string;
  message: string;
}

export const Note: React.FC<NoteProps> = ({ date, id, message }) => {
  const { notesState, setEditNoteId, setEditMessage } = useNoteStore();
  const {activeNotesId, activeNoteMessage} = notesState;

  const currentDate = new Date(date);
  const stringDate = format(date, "d MMMM");
  const stringTime = currentDate.toLocaleTimeString();

  const isEdit = activeNotesId === id
  const borderStyles = "border border-solid border-[#DCE5FF] rounded  p-2 ";

  return (
    <div
      className={`flex flex-col gap-[10px] ${
        isEdit ? borderStyles : ""
      }' `}
    >
      <Row alignItems="center" className="justify-end text-[12px]">
        <span className="text-[#4A709A]">{stringDate}</span>
        <span className="text-[#4A709A]">{stringTime}</span>
      </Row>
      <EditArea
        onClick={() => {
          setEditNoteId(id)
          setEditMessage(message)
        }}
        message={isEdit ? activeNoteMessage : message}
        isEdit={isEdit}
        onChange={(newMessage) => {
          setEditMessage(newMessage);
        }}
      />
    </div>
  );
};
