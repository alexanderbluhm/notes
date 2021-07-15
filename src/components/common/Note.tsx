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
}

const Item = ({ note }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);

  return (
    <li
      key={note.id}
      className="text-gray-200 group -ml-4 xl:-ml-16 flex items-baseline relative"
    >
      <span className="w-8 absolute font-light text-white top-2 right-1 opacity-0 sm:group-hover:opacity-100 mr-4 text-sm xl:text-gray-400 xl:static transition-opacity duration-500">
        {format(parseISO(note.createdAt), "hh:mm")}
      </span>
      <div
        className="relative w-full"
        onMouseEnter={() => setActiveId(note.id)}
      >
        {note.id === activeId && (
          <motion.div
            layoutId="hover"
            initial={{ opacity: 0 }}
            animate={{
              backgroundColor: "#18181B",
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={spring}
            className="absolute inset-0 rounded-md bg-gray-900"
          ></motion.div>
        )}
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


const Note = () => {}

Note.Item = Item;

export default Note;