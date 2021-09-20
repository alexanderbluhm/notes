import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";

export const Meta = () => {
  return (
    <Head>
      <title>Notelist</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000000" />
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <meta name="description" content="Lightweight note app" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};
