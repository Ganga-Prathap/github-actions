import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test("renders the repository dashboard and changes workflow state", () => {
  document.body.innerHTML = '<div id="root"></div>';
  const root = createRoot(document.getElementById("root"));

  act(() => root.render(<App />));
  expect(document.body.textContent).toContain("github-actions");
  expect(document.body.textContent).toContain("Recent runs");

  act(() => document.querySelector(".primary-button").click());
  expect(document.body.textContent).toContain("Running...");
  act(() => root.unmount());
});
