import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/flowbite-base.css";
import "flowbite/dist/flowbite.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
