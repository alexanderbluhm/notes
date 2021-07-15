import React from "react";
import { format } from "date-fns";

interface Props {
  note: any;
}

export const NoteListItem = ({ note }: Props) => {
  return (
    <li
      key={note.id}
      className="text-gray-200 group -ml-16 flex items-baseline relative"
    >
      <span className="w-8 absolute font-light text-white top-2 right-1 opacity-0 sm:group-hover:opacity-100 mr-4 text-sm xl:text-gray-400 xl:static transition-opacity duration-200">
        {format(new Date(), "hh:mm")}
      </span>
      <div className="relative w-full">
        <div className="absolute inset-0 rounded-md bg-gray-900"></div>
        <a
          href="#"
          className="isolate px-4 py-3 block w-full rounded-md bg-transparent"
        >
          {note.title}
        </a>
      </div>
    </li>
  );
};
