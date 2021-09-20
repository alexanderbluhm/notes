import React from "react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useActiveId } from "@/lib/useActive";
import Link from "next/link";
import { BookmarkIcon, RefreshIcon } from "../icons";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

interface Props {
  note: any;
  bookmark: (id: string) => void;
  as?: string;
}

const Item = ({ note, bookmark, as = "div" }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);
  let Component: any = as;

  return (
    <Component className="relative flex items-baseline text-gray-200 group">
      <span
        className="absolute z-20 text-sm font-light text-white transition-opacity duration-500 opacity-0 w-14 right-4 lg:-translate-x-full lg:-left-4 top-4 lg:group-hover:opacity-100 xl:text-gray-400"
      >
        {format(parseISO(note.createdAt), "dd. MMM")}
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
            className="absolute inset-0 bg-gray-900 rounded-md"
          ></motion.div>
        )}
        <span className="relative z-10 flex items-center justify-between px-4 py-2 rounded-md">
          <Link href={!note.loading ? `/notes/${note.id}` : "#"}>
            <a className="w-full mr-12 overflow-hidden break-words" href="">
              {note.title}
            </a>
          </Link>
          <button
            onClick={() => bookmark(note.id)}
            className="invisible xl:visible inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="sr-only">
              {note.bookmarked ? "Remove bookmark" : "Add bookmark"}
            </span>

            {note.loading && (
              <RefreshIcon
                className="w-6 h-6 animate-spin"
                aria-hidden="true"
              />
            )}

            {!note.loading && (
              <BookmarkIcon
                aria-hidden="true"
                className="w-6 h-6 text-brand from-indigo-400 to-purple-500"
                fill={note.bookmarked ? "url(#grad1)" : "none"}
                stroke={note.bookmarked ? "transparent" : "url(#grad1)"}
              />
            )}
          </button>
        </span>
      </div>
    </Component>
  );
};

const Note = () => {};

Note.Item = Item;

export default Note;
