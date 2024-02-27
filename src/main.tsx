import ReactDOM from "react-dom/client";
import App from "./routes";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
