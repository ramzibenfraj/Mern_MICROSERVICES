
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const reduxStore = store; // Use the imported store

reduxStore.subscribe(() => {
  saveState(reduxStore);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

serviceWorker.register();
