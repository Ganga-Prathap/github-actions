import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test("renders the repository dashboard and changes workflow state", () => {
  document.body.innerHTML = '<div id="root"></div>';
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Test root was not created");
  const root = createRoot(rootElement);

  act(() => root.render(<App />));
  expect(document.body.textContent).toContain("github-actions");
  expect(document.body.textContent).toContain("Recent runs");

  const workflowButton = document.querySelector(".primary-button");
  if (!(workflowButton instanceof HTMLButtonElement))
    throw new Error("Workflow button was not rendered");
  act(() => workflowButton.click());
  expect(document.body.textContent).toContain("Running...");
  act(() => root.unmount());
});
