import { RouterProvider } from "react-router";
import router from "./router/Router";

import 'primereact/resources/themes/saga-blue/theme.css';  // Välj ett tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';





export default function App() {
  return <RouterProvider router={router} />;
}
