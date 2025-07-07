// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import Router from "./routes/route.tsx";
import "@ant-design/v5-patch-for-react-19";
// import tailwindcss from '@tailwindcss/vite'

createRoot(document.getElementById("root")!).render (<Router />);
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })