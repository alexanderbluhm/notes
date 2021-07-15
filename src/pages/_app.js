import { SWRConfig } from "swr";
import "../styles/main.css";

const App = ({ Component, pageProps }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
};

export default App;
