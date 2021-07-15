import Head from "next/head";
import { Navbar } from "@/components/common";
import useSWR from "swr";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useActiveId } from "@/lib/useActive";
import { Note } from "@/components/common";
import { useState } from "react";

const Home = () => {
  const { data, error, mutate } = useSWR("/api/notes");
  const { id: activeId, setActiveId } = useActiveId((state) => state);

  const [noteText, setNoteText] = useState("");

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 40,
  };

  const handleCreate = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter") {
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

      await fetch("/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).catch(ex => {

      }).finally(() => {
        setNoteText("");
      });

      // revalidate
      mutate();
    }
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="bg-black text-white">
      <Head>
        <title>Notelist</title>
        <meta key="description" content="Lightweight note app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-4xl pb-12 mx-auto px-4 lg:px-6 pt-12 xl:pt-28 space-y-8">
        <AnimateSharedLayout>
          {/* {JSON.stringify(data)} */}
          <section aria-labelledby="add-new">
            <h2 id="add-new" className="sr-only">
              Add new note
            </h2>

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

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onMouseEnter={() => setActiveId("note-input")}
                onKeyDown={handleCreate}
                rows={1}
                spellCheck={false}
                className="w-full isolate bg-transparent h-auto resize-none overflow-y-hidden p-4 rounded-md focus:outline-none appearance-none placeholder-gray-400"
                placeholder="Add Quick Note"
              ></textarea>
            </div>
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
                    .map((note) => <Note.Item note={note} />)}
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
                    .map((note) => <Note.Item note={note} />)}
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
