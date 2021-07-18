import { DeleteDialog, Navbar } from "@/components/common";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { formatRelative, parseISO } from "date-fns";
import { BookmarkIcon, LockIcon, TrashIcon } from "@/components/icons";
import { Menu } from "@headlessui/react";
import { useNotification } from "@/lib/useNotification";

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

  const { addNotification } = useNotification();

  // set content when note is loaded
  useEffect(() => {
    if (note && note.content) setContent(note.content);
  }, [note]);

  const toggleBookmark = async () => {
    const updated = { ...note, bookmarked: !note.bookmarked };
    mutate(updated, false);
    await updateNote(updated);
  };

  const handleDelete = async () => {
    await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
    }).catch((ex) => {
      console.error(ex);
    });

    addNotification({ text: "Deleted Note", type: "info" });
    router.replace("/");
  };

  const handleUpdate = async () => {
    // if nothing changed we don't want an update
    if (note.content === content) return;

    setPreviewActive(true);

    let updatedNote = { ...note };
    updatedNote.content = content;

    await updateNote(updatedNote);
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

    addNotification({ text: "Updated Note", type: "info" });
  };

  return (
    <main className="max-w-4xl pb-12 mx-auto px-4 lg:px-6 pt-12 xl:pt-20 divide-y divide-gray-800">
      {note && (
        <>
          <div className="flex items-center justify-between pb-6">
            <div className="">
              {/* <Note.Item note={data} bookmark={() => {}} /> */}
              <h1 className="text-xl font-medium">{note.title}</h1>
              <span className="text-sm text-gray-400">
                {formatRelative(parseISO(note.createdAt), new Date())}
              </span>
            </div>
            <div className="flex sm:space-x-2 items-center">
              <button
                onClick={toggleBookmark}
                className="inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200"
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
              <button className="inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <span className="sr-only">Managae visibility</span>
                <LockIcon
                  aria-hidden="true"
                  className="w-6 h-6 from-green-400 to-green-500"
                  stroke={"url(#grad3)"}
                />
              </button>
              <DeleteDialog onDelete={handleDelete}>
                <Menu.Button className="inline-flex p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <span className="sr-only">Delete note</span>
                  <TrashIcon
                    aria-hidden="true"
                    className="w-6 h-6 text-brand from-rose-400 to-red-500"
                    fill="url(#grad2)"
                  />
                </Menu.Button>
              </DeleteDialog>

              {/* Seperator */}
              <div className="w-px h-6 bg-gray-700 ml-1 mr-1 sm:mr-0 sm:ml-6"></div>
              <button
                onClick={handleUpdate}
                style={{ zIndex: 10 }}
                className="hover:bg-gray-800 border border-transparent transition-colors isolate px-3 py-1.5 bg-black rounded-md text-sm backdrop-filter backdrop-blur-md"
              >
                Save
              </button>
            </div>
          </div>

          <div className="pt-6">
            <div className="relative">
              {previewActive && !note.content && !content && (
                <div className="py-3 text-gray-400 pr-20">
                  Click on <b>edit</b> to add more content to the note!
                </div>
              )}

              {previewActive && (
                <div className="py-2 prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    children={content}
                  />
                </div>
              )}

              {!previewActive && (
                <textarea
                  rows={5}
                  placeholder="Content ..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-gray-900 bg-opacity-70 placeholder-gray-500 isolate flex justify-between items-center px-3 py-2 w-full rounded-md"
                >
                  {note?.content}
                </textarea>
              )}

              <div className="absolute top-2 right-2 flex items-center justify-between space-x-2">
                <button
                  onClick={() => setPreviewActive((prev) => !prev)}
                  style={{ zIndex: 10 }}
                  className="hover:bg-gray-800 border border-gray-700 transition-colors isolate px-3 py-1.5 bg-black rounded-md text-sm bg-opacity-40 backdrop-filter backdrop-blur-md"
                >
                  {previewActive ? "Edit" : "Preview"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Index;
