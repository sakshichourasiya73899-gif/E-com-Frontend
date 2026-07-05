import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

=======
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
>>>>>>> 701e9bf349e789c5991dcb89f0a7b70b67dca075
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
