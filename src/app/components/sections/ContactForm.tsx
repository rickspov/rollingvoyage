import { useState } from "react";
import { useLanguage } from "../../i18n/context";
import { submitContactForm } from "../../lib/submitContactForm";
import { Button } from "../ui/button";

export function ContactForm() {
  const { t } = useLanguage();
  const { form } = t.contact;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    setStatus("sending");
    const result = await submitContactForm({ name, email, message });
    setStatus(result.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="bg-card border border-border p-10 text-center">
        <p className="font-subtitle text-2xl text-primary mb-3">{form.successTitle}</p>
        <p className="text-foreground/70">{form.microcopy}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-foreground/70 mb-2">
          {form.name}
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          disabled={status === "sending"}
          className="w-full bg-input-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-foreground/70 mb-2">
          {form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={status === "sending"}
          className="w-full bg-input-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-foreground/70 mb-2">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={status === "sending"}
          className="w-full bg-input-background border border-border px-4 py-3 text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
        />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full md:w-auto justify-center"
          disabled={status === "sending"}
        >
          {status === "sending" ? form.submitting : form.submit}
        </Button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700/80" role="alert">
            {form.error}
          </p>
        )}
        <p className="mt-4 text-xs text-foreground/50">{form.microcopy}</p>
      </div>
    </form>
  );
}
