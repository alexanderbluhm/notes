import React from "react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useActiveId } from "@/lib/useActive";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

interface Props {
  note: any;
  bookmark: (id: string) => void;
}

const Item = ({ note, bookmark }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);

  return (
    <li className="text-gray-200 group -ml-4 xl:-ml-16 flex items-baseline relative">
      <span
        style={{ zIndex: 10 }}
        className="w-8 absolute font-light text-white top-3.5 right-1 opacity-0 group-hover:opacity-100 mr-4 text-sm xl:text-gray-400 xl:static transition-opacity duration-500"
      >
        {format(parseISO(note.createdAt), "hh:mm")}
      </span>
      <div
        className="relative w-full"
        onMouseEnter={() => setActiveId(note.id)}
      >
        {note.id === activeId && (
          <motion.div
            layoutId="hover"
            animate={{
              backgroundColor: "#18181B",
            }}
            transition={spring}
            className="absolute inset-0 rounded-md bg-gray-900"
          ></motion.div>
        )}
        <span className="isolate flex justify-between items-center px-4 py-3 w-full rounded-md bg-transparent">
          {note.title}
          <button
            onClick={() => bookmark(note.id)}
            className="inline-flex p-1 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6 text-brand"
              fill={note.bookmarked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </li>
  );
};

const Note = () => {};

Note.Item = Item;

export default Note;
