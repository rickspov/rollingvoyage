export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sends the contact form via Web3Forms (no backend required for this Vite app).
 * Set VITE_WEB3FORMS_ACCESS_KEY in `.env` — emails go to the inbox registered
 * when creating the key (hello@rollingvoyage.com).
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  if (!accessKey) {
    return {
      ok: false,
      error: "missing_access_key",
    };
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Rolling Voyage — new inquiry from ${payload.name}`,
      from_name: "Rolling Voyage Website",
      name: payload.name,
      email: payload.email,
      message: payload.message || "(no message)",
    }),
  });

  const data = (await res.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!res.ok || !data?.success) {
    return {
      ok: false,
      error: data?.message || `http_${res.status}`,
    };
  }

  return { ok: true };
}
