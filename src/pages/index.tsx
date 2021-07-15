import Head from "next/head";
import { Navbar } from "@/components/common";
import useSWR from "swr";
import { format, parseISO } from "date-fns";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const { data, error } = useSWR("/api/notes");
  const [hovered, setHovered] = useState(-1);

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 40,
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="bg-black text-white">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-4xl pb-12 mx-auto px-4 lg:px-6 pt-28 space-y-8">
        <AnimateSharedLayout>
          {/* {JSON.stringify(data)} */}
          <section aria-labelledby="add-new">
            <h2 id="add-new" className="sr-only">
              Add new note
            </h2>

            <div
              className="relative w-full"
              onMouseEnter={() => setHovered(99)}
            >
              {99 === hovered && (
                <motion.div
                  layoutId="hover"
                  initial={false}
                  animate={{ backgroundColor: "#18181B" }}
                  transition={spring}
                  className="absolute inset-0 mb-2 rounded-md bg-gray-900"
                ></motion.div>
              )}

              <textarea
                rows={1}
                spellCheck={false}
                className="w-full  isolate bg-transparent h-auto resize-none overflow-y-hidden p-4 rounded-md focus:outline-none appearance-none placeholder-gray-400"
                placeholder="Quick Note"
              ></textarea>
            </div>
          </section>

          <div className="divide-y divide-gray-800">
            <section
              aria-labelledby="bookmarked"
              className="pb-8 px-4 space-y-4"
            >
              <h2 id="bookmarked" className="text-2xl font-bold">
                Bookmarked
              </h2>
              <ul className="space-y-3">
                {data &&
                  data
                    .filter((note) => note.bookmarked)
                    .map((note) => (
                      <li
                        key={note.id}
                        className="text-gray-200 group -ml-16 flex items-baseline relative"
                      >
                        <span className="w-8 absolute font-light text-white top-2 right-1 opacity-0 sm:group-hover:opacity-100 mr-4 text-sm xl:text-gray-400 xl:static transition-opacity duration-300">
                          {format(parseISO(note.createdAt), "hh:mm")}
                        </span>
                        <div
                          className="relative w-full"
                          onMouseEnter={() => setHovered(note.id)}
                        >
                          {note.id === hovered && (
                            <motion.div
                              layoutId="hover"
                              initial={false}
                              animate={{ backgroundColor: "#18181B" }}
                              transition={spring}
                              className="absolute inset-0 rounded-md bg-gray-900"
                            ></motion.div>
                          )}
                          <a
                            href="#"
                            className="isolate px-4 py-3 block w-full rounded-md bg-transparent"
                          >
                            {note.title}
                          </a>
                        </div>
                      </li>
                    ))}
              </ul>
            </section>

            <section aria-labelledby="latest" className="pt-8 px-4 space-y-4">
              <h2 id="latest" className="text-2xl font-bold">
                Latest
              </h2>

              <ul className="space-y-3">
                {data &&
                  data
                    .filter((note) => !note.bookmarked)
                    .map((note) => (
                      <li
                        key={note.id}
                        className="text-gray-200 group -ml-16 flex items-baseline relative"
                      >
                        <span className="w-8 absolute font-light text-white top-2 right-1 opacity-0 sm:group-hover:opacity-100 mr-4 text-sm xl:text-gray-400 xl:static transition-opacity duration-300">
                          {format(parseISO(note.createdAt), "hh:mm")}
                        </span>
                        <div
                          className="relative w-full"
                          onMouseEnter={() => setHovered(note.id)}
                        >
                          {note.id === hovered && (
                            <motion.div
                              layoutId="hover"
                              initial={false}
                              animate={{ backgroundColor: "#18181B" }}
                              transition={spring}
                              className="absolute inset-0 rounded-md bg-gray-900"
                            ></motion.div>
                          )}
                          <a
                            href="#"
                            className="isolate px-4 py-3 block w-full rounded-md bg-transparent"
                          >
                            {note.title}
                          </a>
                        </div>
                      </li>
                    ))}
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
