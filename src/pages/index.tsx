import { Alert, Note, SubmitTextarea } from "@/components/common";
import { Layout } from "@/layouts/layout";
import { useNotification } from "@/lib/useNotification";
import { AnimateSharedLayout } from "framer-motion";
import { signIn } from "next-auth/client";
import { useState } from "react";
import useSWR from "swr";

const Home = () => {
  const { data, error, mutate } = useSWR<Array<any>, any>("/api/notes");
  const [noteText, setNoteText] = useState("");
  const { addNotification } = useNotification();

  const bookmarked: Array<any> = data.filter((note) => note.bookmarked) || [];

  const handleCreate = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      // we want to submit on enter and don't create a new line
      e.preventDefault();

      if (noteText.length === 0) return;

      const note = {
        title: noteText,
        createdAt: new Date().toISOString(),
        loading: true,
      };

      // mutate but not revalidate
      mutate([note, ...data], false);
      setNoteText("");

      await fetch("/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).catch((ex) => {
        console.error(ex);
      });

      addNotification({ text: "Created Note", type: "info" });
      // revalidate
      mutate();
    }
  };

  const handleBookmark = async (id: String) => {
    let index = data.findIndex((note) => note.id === id);
    if (index == -1) return;
    let note = data[index];
    note.bookmarked = !note.bookmarked;
    let copy = data;
    copy.splice(index, 1);
    const sorted = [...copy, note].sort((note1, note2) =>
      note1.createdAt >= note2.createdAt ? -1 : 1
    );
    mutate(sorted, false);

    await fetch("/api/notes", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).catch((ex) => {
      addNotification({ text: "Error", type: "error" });
      console.error(ex);
    });

    addNotification({ text: "Changed Bookmark", type: "info" });
    // revalidate
    mutate();
  };

  return (
    <Layout>
      {error && error.status === 401 && (
        <Alert onClick={signIn} text="Please login to create notes" />
      )}

      <AnimateSharedLayout>
        <section aria-labelledby="add-new">
          <h2 id="add-new" className="sr-only">
            Add new note
          </h2>

          <SubmitTextarea
            value={noteText}
            setValue={setNoteText}
            handleKeyDown={handleCreate}
          />
        </section>

        <div className="mt-6 divide-y divide-gray-800">
          <section aria-labelledby="bookmarked" className="pb-8 space-y-4">
            <div className="flex items-end justify-between px-4">
              <h2
                id="bookmarked"
                className="z-10 block text-2xl font-bold isolate"
              >
                Bookmarked
              </h2>
            </div>
            <ul className="space-y-3">
              {bookmarked.map((note) => (
                <Note.Item
                  as="li"
                  key={note.id}
                  bookmark={handleBookmark}
                  note={note}
                />
              ))}

              {data.length === 0 && !error && <li className="px-4">Loading ...</li>}
            </ul>
          </section>

          <section aria-labelledby="latest" className="pt-8 space-y-4">
            <div className="flex items-end justify-between px-4">
              <h2 id="latest" className="z-10 text-2xl font-bold isolate">
                Latest
              </h2>
            </div>

            <ul className="space-y-3">
              {data
                .filter((note) => !note.bookmarked)
                .map((note) => (
                  <Note.Item
                    as="li"
                    key={note.id}
                    bookmark={handleBookmark}
                    note={note}
                  />
                ))}

              {data.length === 0 && !error && <li className="px-4">Loading ...</li>}
            </ul>
          </section>
        </div>
      </AnimateSharedLayout>
    </Layout>
  );
};

export default Home;
