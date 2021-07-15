import "../styles/main.css";

const App = ({ Component, pageProps }) => {
  return (
    <div className="bg-black min-h-screen">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
