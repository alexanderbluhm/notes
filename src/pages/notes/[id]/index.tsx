import { PublishedDialog, DeleteDialog, Navbar } from "@/components/common";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import useSWR, { mutate as _mutate } from "swr";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import gfm from 'remark-gfm'
import "katex/dist/katex.min.css";
import { formatRelative, parseISO } from "date-fns";
import { BookmarkIcon, LockIcon, TrashIcon } from "@/components/icons";
import { Menu } from "@headlessui/react";
import { useNotification } from "@/lib/useNotification";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Prism from "prismjs";

interface Props {}

// Index page for a specific note
const Index = (props: Props) => {
  const router = useRouter();
  const [session] = useSession();
  const [previewActive, setPreviewActive] = useState(true);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // we want to use this because we call Prisma after we called setContent
  const resettingRef = useRef(false);
  const { id } = router.query;
  const {
    data: note,
    error,
    mutate,
  } = useSWR(id ? `/api/notes/${id}` : undefined);

  const { addNotification } = useNotification();

  const isAuthor = session && note && session.id === note.authorId;

  // set content when note is loaded
  useEffect(() => {
    if (note && note.content) {
      resettingRef.current = true;
      setContent(note.content);
    } 
  }, [note]);

  // we set the ref above to true if we call setContent
  // if then the content changes we call Prism
  useEffect(() => {
    if (resettingRef.current && content.length > 0) {
      resettingRef.current = false;
      Prism.highlightAll();
    }
  }, [content])

  useEffect(() => {
    if (previewActive && content.length > 0) {
      Prism.highlightAll();
    }
  }, [previewActive])

  const toggleBookmark = async () => {
    const updated = { ...note, bookmarked: !note.bookmarked };
    await updateNote(updated);
  };

  const handlePublishedChanged = async (value: boolean) => {
    const updated = { ...note, published: value };
    updateNote(updated);
  };

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
    }).catch((ex) => {
      console.error(ex);
    });

    addNotification({ text: "Deleted Note", type: "info" });
    setLoading(false);
    // remove the note from the cache
    _mutate(
      "/api/notes",
      async (notes) => (notes ? notes.filter((n) => n.id !== note.id) : []),
      false
    );
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
    setLoading(true);
    // store the updated note in the cache
    mutate(note, false);
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
    setLoading(false);
    addNotification({ text: "Updated Note", type: "info" });
  };

  if (error)
    return (
      <div className="max-w-4xl px-4 pt-12 pb-12 mx-auto divide-y divide-gray-800 lg:px-6 xl:pt-20">
        <div className="p-4 overflow-hidden text-sm font-light border rounded-md text-brand-red border-brand-red">
          An error occurred.{" "}
          <Link href="/">
            <a className="font-normal underline">Back to home</a>
          </Link>{" "}
          {Object.values(error).length > 0 && JSON.stringify(error)}
        </div>
      </div>
    );

  return (
    <main className="max-w-4xl px-4 pt-12 pb-12 mx-auto divide-y divide-gray-800 lg:px-6 xl:pt-20">
      {note && (
        <>
          <div className="flex flex-col justify-between pb-6 space-y-2 sm:flex-row sm:space-y-0 sm:items-center">
            <div className="flex-1 overflow-hidden">
              {/* <Note.Item note={data} bookmark={() => {}} /> */}
              <h1 className="text-xl font-medium break-words">{note.title}</h1>
              <span className="text-sm text-gray-400">
                {formatRelative(parseISO(note.createdAt), new Date())}
              </span>
            </div>
            {/* Menu */}
            {isAuthor && (
              <div className="flex items-center sm:space-x-2">
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
                <PublishedDialog
                  url={`${process.env.NEXT_PUBLIC_APP_URL}/notes/${note.id}`}
                  published={note.published}
                  disabled={loading}
                  onPublishedChanged={handlePublishedChanged}
                />
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
                <div className="w-px h-6 ml-1 mr-1 bg-gray-700 sm:mr-0 sm:ml-6"></div>
                <Button
                  onClick={handleUpdate}
                  className="hover:bg-gray-800 active:bg-gray-900 border border-transparent transition-colors px-3 py-1.5 bg-black rounded-md text-sm backdrop-filter backdrop-blur-md"
                  loading={loading}
                >
                  Save
                </Button>
                {/* <button
                onClick={handleUpdate}
                className="hover:bg-gray-800 border border-transparent transition-colors px-3 py-1.5 bg-black rounded-md text-sm backdrop-filter backdrop-blur-md"
              >
                Save
              </button> */}
              </div>
            )}
          </div>

          <div className="pt-6">
            <div className="relative">
              {previewActive && (
                <div className="py-2 prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath, gfm]}
                    rehypePlugins={[rehypeKatex]}
                    children={
                      content.length > 0
                        ? content
                        : `
Click on **edit** to add content to the note ✨  
You can even add ***markdown*** or $LaTeX$ 
                    `
                    }
                  />
                </div>
              )}

              {!previewActive && (
                <TextareaAutosize
                  onDrop={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(e.dataTransfer.files);
                  }}
                  placeholder="Content ..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex items-center justify-between w-full px-3 py-3 placeholder-gray-500 bg-gray-900 rounded-md bg-opacity-70"
                >
                  {note?.content}
                </TextareaAutosize>
              )}

              {isAuthor && (
                <div className="absolute flex items-center justify-between space-x-2 top-2 right-2">
                  <button
                    onClick={() => setPreviewActive((prev) => !prev)}
                    className="hover:bg-gray-800 border border-gray-700 transition-colors px-3 py-1.5 bg-black rounded-md text-sm bg-opacity-40 backdrop-filter backdrop-blur-md"
                  >
                    {previewActive ? "Edit" : "Preview"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Index;
