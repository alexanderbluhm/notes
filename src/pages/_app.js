import { SWRConfig } from "swr";
import "../styles/main.css";
import { Provider } from "next-auth/client";

const fetcher = async (...args) => {
  const res = await fetch(...args);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const App = ({ Component, pageProps }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Provider session={pageProps.session}>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </div>
  );
};

export default App;
