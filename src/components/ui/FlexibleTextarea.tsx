import { useActiveId } from "@/lib/useActive";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

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

const NAME = "note-input";

export const FlexibleTextarea = ({ value, setValue, handleKeyDown }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);
  const ref = useRef<HTMLTextAreaElement>();

  const handleChange = (value: string) => {
    setValue(value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e);
  };

  const handleDocumentKey = (e: KeyboardEvent) => {
    if (e.key === "k" && e.metaKey) {
      setActiveId(NAME);
      ref.current.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKey);
    return () => {
      document.removeEventListener("keydown", handleDocumentKey);
    };
  }, []);

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
          className="absolute inset-0 bg-gray-900 rounded-md"
        />
      )}

      <div className="relative flex items-center justify-center">
        <TextareaAutosize
          ref={ref}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onMouseEnter={() => setActiveId(NAME)}
          onKeyDown={handleKey}
          rows={1}
          spellCheck={false}
          className="w-full py-4 pl-4 pr-16 overflow-y-hidden placeholder-gray-500 bg-transparent rounded-md resize-none isolate focus:outline-none"
          placeholder="Add Quick Note"
        />
        <div
          className={`hidden sm:flex transition-opacity absolute inset-y-0 right-0 items-center justify-center pr-3 ${
            activeId === NAME ? "opacity-100" : "opacity-0"
          }`}
        >
          <kbd className="inline-flex items-center h-8 px-2 font-sans text-sm font-medium text-gray-400 border border-gray-700 rounded">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};
