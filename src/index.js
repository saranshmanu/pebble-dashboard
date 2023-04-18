import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import store from "./store";
import { initDatabaseInstance } from "./database";

const init = async () => {
  await initDatabaseInstance();
  const root = ReactDOM.createRoot(document.getElementById("root"));

  // HashRouter works in a file based environment
  // BrowserRouter works in a browser based environment
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    </Provider>
  );
};

init();
