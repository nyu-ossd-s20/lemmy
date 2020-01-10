import { hydrate } from "inferno-hydrate";
import App from "./components/App";
const wrapper = (
      <App />
);
hydrate(wrapper, document.getElementById("root"));
