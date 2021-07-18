import { Navbar } from "@/components/common";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { formatRelative, parseISO } from "date-fns";
import { BookmarkIcon, TrashIcon } from "@/components/icons";

interface Props {}

// Index page for a specific note
const Index = (props: Props) => {
  const router = useRouter();
  const [previewActive, setPreviewActive] = useState(true);
  const [content, setContent] = useState("");
  const { id } = router.query;
  const {
    data: note,
    error,
    mutate,
  } = useSWR(id ? `/api/notes/${id}` : undefined);

  // set content when note is loaded
  useEffect(() => {
    if (note && note.content) setContent(note.content);
  }, [note]);

  const toggleBookmark = async () => {
    const updated = { ...note, bookmarked: !note.bookmarked };
    mutate(updated, false);
    await updateNote(updated);
  };

  const handleUpdate = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      // we want to submit on enter and don't create a new line
      e.preventDefault();

      // if nothing changed we don't want an update
      if (note.content === content) return;

      setPreviewActive(true);

      let updatedNote = { ...note };
      updatedNote.content = content;

      await updateNote(updatedNote);
    }
  };

  const updateNote = async (note) => {
    await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).catch((ex) => {
      console.error(ex);
    });
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl pb-12 mx-auto px-4 lg:px-6 pt-12 xl:pt-20 space-y-8">
        {note && (
          <>
            <div className="flex items-start justify-between">
              <div className="">
                {/* <Note.Item note={data} bookmark={() => {}} /> */}
                <span className="text-sm text-gray-400">
                  {formatRelative(parseISO(note.createdAt), new Date())}
                </span>
                <h1 className="text-lg font-medium">{note.title}</h1>
              </div>
              <div className="space-x-2 items-center">
                <button
                  onClick={toggleBookmark}
                  className="invisible xl:visible inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">
                    {note.bookmarked ? "Remove bookmark" : "Add bookmark"}
                  </span>
                  <BookmarkIcon
                    aria-hidden="true"
                    className="w-6 h-6 text-brand from-indigo-400 to-purple-500"
                    fill={note.bookmarked ? "url(#grad1)" : "none"}
                    stroke={note.bookmarked ? "transparent" : "url(#grad1)"}
                  />
                </button>
                <button
                  // onClick={() => bookmark(note.id)}
                  className="invisible xl:visible inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="sr-only">Delete note</span>
                  <TrashIcon
                    aria-hidden="true"
                    className="w-6 h-6 text-brand from-rose-400 to-red-500"
                    fill="url(#grad2)"
                  />
                </button>
              </div>
            </div>

            <div className="relative">
              {previewActive && (
                <div className="py-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    children={content}
                  />
                </div>
              )}

              {!previewActive && (
                <textarea
                  onKeyDown={handleUpdate}
                  rows={5}
                  placeholder="Markdown Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-gray-900 isolate flex justify-between items-center px-3 py-2 w-full rounded-md"
                >
                  {note?.content}
                </textarea>
              )}

              <button
                onClick={() => setPreviewActive((prev) => !prev)}
                style={{ zIndex: 10 }}
                className="absolute hover:bg-gray-800 border border-gray-700 transition-colors isolate top-2 right-2 px-3 py-1.5 bg-black rounded-md text-sm bg-opacity-40 backdrop-filter backdrop-blur-md"
              >
                {previewActive ? "Edit" : "Preview"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
