import Head from "next/head";
import { Alert } from "@/components/common";
import useSWR from "swr";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Note } from "@/components/common";
import { useState } from "react";
import { FlexibleTextarea } from "@/components/ui";
import { signIn } from "next-auth/client";
import { useNotification } from "@/lib/useNotification";

const Home = () => {
  const { data, error, mutate } = useSWR("/api/notes");
  const [noteText, setNoteText] = useState("");
  const { addNotification } = useNotification();

  const handleCreate = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      // we want to submit on enter and don't create a new line
      e.preventDefault();

      if (noteText.length === 0) return;

      const note = {
        title: noteText,
        createdAt: new Date().toISOString(),
        authorId: 1,
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
    // note.updatedAt = new Date().toISOString();
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
    <div className="bg-black text-white">
      <Head>
        <title>Notelist</title>
        <meta key="description" content="Lightweight note app" />
      </Head>

      <main className="max-w-4xl pb-12 mx-auto px-4 lg:px-6 pt-12 xl:pt-20 space-y-8">
        {/* {!data && !error && <div>Loading ...</div>} */}

        {error && error.status === 401 && (
          <Alert onClick={signIn} text="Please login to create notes" />
        )}

        <AnimateSharedLayout>
          {/* {JSON.stringify(data)} */}
          <section aria-labelledby="add-new">
            <h2 id="add-new" className="sr-only">
              Add new note
            </h2>

            <FlexibleTextarea
              value={noteText}
              setValue={setNoteText}
              handleKeyDown={handleCreate}
            />
          </section>

          <div className="divide-y divide-gray-800">
            <section
              aria-labelledby="bookmarked"
              className="pb-8 px-4 space-y-4"
            >
              <div className="flex items-end justify-between">
                <h2
                  style={{ zIndex: 10 }}
                  id="bookmarked"
                  className="text-2xl font-bold isolate block"
                >
                  Bookmarked
                </h2>
              </div>
              <ul className="space-y-3">
                {data &&
                  data
                    .filter((note) => note.bookmarked)
                    .map((note) => (
                      <Note.Item
                        as="li"
                        key={note.id}
                        bookmark={handleBookmark}
                        note={note}
                      />
                    ))}

                {!data && !error && <li>Loading ...</li>}
              </ul>
            </section>

            <section aria-labelledby="latest" className="pt-8 px-4 space-y-4">
              <div className="flex items-end justify-between">
                <h2
                  style={{ zIndex: 10 }}
                  id="latest"
                  className="text-2xl font-bold isolate"
                >
                  Latest
                </h2>
              </div>

              <ul className="space-y-3">
                {data &&
                  data
                    .filter((note) => !note.bookmarked)
                    .map((note) => (
                      <Note.Item
                        as="li"
                        key={note.id}
                        bookmark={handleBookmark}
                        note={note}
                      />
                    ))}

                {!data && !error && <li>Loading ...</li>}
              </ul>
            </section>
          </div>
        </AnimateSharedLayout>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
