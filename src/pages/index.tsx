import Head from "next/head";
import { Navbar } from "@/components/common";

const Home = () => (
  <div className="bg-black text-white">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />

    <main className="max-w-5xl mx-auto px-4 lg:px-6 pt-28 space-y-8">
      <section aria-labelledby="add-new">
        <h2 id="add-new" className="sr-only">
          Add new note
        </h2>

        <textarea
          rows={1}
          spellCheck={false}
          className="w-full bg-black h-auto resize-none overflow-y-hidden p-4 text-lg rounded focus:outline-none appearance-none hover:bg-gray-900 focus:bg-gray-900 placeholder-gray-400"
          placeholder="Quick Note"
        ></textarea>
      </section>

      <section aria-labelledby="bookmarked" className="px-4">
        <h2 id="bookmarked" className="text-2xl font-bold">
          Bookmarked
        </h2>
      </section>
    </main>

    <footer></footer>
  </div>
);

export default Home;
