import { useActiveId } from "@/lib/useActive";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

interface Props {
  value: string;
  setValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const NAME = "note-input"

export const FlexibleTextarea = ({ value, setValue, handleKeyDown }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);
  const ref = useRef<HTMLTextAreaElement>();

  const handleChange = (value: string) => {
    setValue(value)
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e);
  };

  const handleDocumentKey = (e: KeyboardEvent) => {
    if (e.key === "k" && e.metaKey) {
      setActiveId(NAME);
      ref.current.focus();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKey)
    return () => {
      document.removeEventListener('keydown', handleDocumentKey)
    }
  }, [])

  return (
    <div className="relative w-full">
      {NAME === activeId && (
        <motion.div
          layoutId="hover"
          initial={false}
          animate={{
            backgroundColor: "#18181B",
          }}
          transition={spring}
          className="absolute inset-0 rounded-md bg-gray-900"
        />
      )}

      <div className="relative flex items-center justify-center">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onMouseEnter={() => setActiveId(NAME)}
          onKeyDown={handleKey}
          rows={1}
          spellCheck={false}
          className="w-full isolate bg-transparent resize-none overflow-y-hidden py-4 pl-4 pr-16 rounded-md focus:outline-none placeholder-gray-500"
          placeholder="Add Quick Note"
        ></textarea>
        <div className={`hidden sm:flex transition-opacity absolute inset-y-0 right-0 items-center justify-center pr-3 ${activeId === NAME ? "opacity-100" : "opacity-0"}`}>
          <kbd className="inline-flex h-8 items-center border border-gray-700 rounded px-2 text-sm font-sans font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};
