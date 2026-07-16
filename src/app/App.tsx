import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
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
      // Spanish
      { path: "enfoque", element: <EnfoquePage /> },
      { path: "que-esperar", element: <QueEsperarPage /> },
      { path: "servicios", element: <ServiciosPage /> },
      { path: "contacto", element: <ContactoPage /> },
      { path: "terminos", element: <TermsPage /> },
      { path: "privacidad", element: <PrivacyPage /> },
      // English
      { path: "approach", element: <EnfoquePage /> },
      { path: "what-to-expect", element: <QueEsperarPage /> },
      { path: "ways-to-travel", element: <ServiciosPage /> },
      { path: "contact", element: <ContactoPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      // Unknown paths → home (avoids React Router's default 404 screen)
      { path: "*", element: <Navigate to="/" replace /> },
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
