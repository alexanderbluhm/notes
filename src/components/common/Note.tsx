import React from "react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { useActiveId } from "@/lib/useActive";
import Link from 'next/link';

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
    <Component className="xl:w-[calc(5rem+100%)] w-[calc(2rem+100%)] relative flex items-baseline -ml-4 text-gray-200 group xl:-ml-16">
      <span
        style={{ zIndex: 10 }}
        className="absolute w-8 mr-4 text-sm font-light text-white transition-opacity duration-500 opacity-0 top-4 right-1 group-hover:opacity-100 xl:text-gray-400 xl:static"
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
            className="absolute inset-0 bg-gray-900 rounded-md"
          ></motion.div>
        )}
        <span className="flex items-center justify-between w-full px-4 py-2 bg-transparent rounded-md isolate">
          <Link href={`/notes/${note.id}`}>
            <a className="block w-full mr-12" href="">{note.title}</a>
          </Link>
          <button
            onClick={() => bookmark(note.id)}
            className="invisible xl:visible inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="sr-only">
              {note.bookmarked ? "Remove bookmark" : "Add bookmark"}
            </span>
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-brand from-indigo-400 to-purple-500"
              fill={note.bookmarked ? "url(#grad1)" : "none"}
              stroke={note.bookmarked ? "transparent" : "url(#grad1)"}
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--tw-gradient-from)" />
                  <stop offset="100%" stopColor="var(--tw-gradient-to)" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </Component>
  );
};

const Note = () => {};

Note.Item = Item;

export default Note;
