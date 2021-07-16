import { useActiveId } from "@/lib/useActive";
import { motion } from "framer-motion";
import React, { useState } from "react";

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

const LINE_HEIGHT = 24;

export const FlexibleTextarea = ({ value, setValue, handleKeyDown }: Props) => {
  const { id: activeId, setActiveId } = useActiveId((state) => state);
  const [lineCount, setLineCount] = useState(2);

  const handleChange = (value: string) => {
    const lines = value.split("\n").length;
    if (lines !== lineCount) setLineCount(lines);
    setValue(value)
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e);
  };

  return (
    <div className="relative w-full">
      {"note-input" === activeId && (
        <motion.div
          layoutId="hover"
          initial={false}
          animate={{
            backgroundColor: "#18181B",
          }}
          transition={spring}
          className="absolute inset-0 mb-2 rounded-md bg-gray-900"
        ></motion.div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onMouseEnter={() => setActiveId("note-input")}
          onKeyDown={handleKey}
          rows={1}
        //   style={{ height: lineCount * LINE_HEIGHT + 8 }}
          spellCheck={false}
          className="w-full isolate bg-transparent resize-none overflow-y-hidden py-4 pl-4 pr-16 rounded-md focus:outline-none placeholder-gray-400"
          placeholder="Add Quick Note"
        ></textarea>
        <div className="hidden absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>

      </div>
    </div>
  );
};
