import { createBrowserRouter, RouterProvider } from "react-router";
import { LanguageProvider } from "./i18n/context";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { EnfoquePage } from "./pages/EnfoquePage";
import { QueEsperarPage } from "./pages/QueEsperarPage";
import { ServiciosPage } from "./pages/ServiciosPage";
import { ContactoPage } from "./pages/ContactoPage";
import { TermsPage, PrivacyPage } from "./pages/LegalPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "enfoque", element: <EnfoquePage /> },
      { path: "que-esperar", element: <QueEsperarPage /> },
      { path: "servicios", element: <ServiciosPage /> },
      { path: "contacto", element: <ContactoPage /> },
      { path: "terminos", element: <TermsPage /> },
      { path: "privacidad", element: <PrivacyPage /> },
    ],
  },
]);

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
