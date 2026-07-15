import { ScrollRestoration } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <PageTransition />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
