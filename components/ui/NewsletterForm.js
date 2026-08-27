"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState("idle");

  function submit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 700);
  }

  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label className="srOnly" htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" name="email" type="email" placeholder="Your email address" />
      <button type="submit" disabled={status === "loading"} aria-label="Join newsletter">
        {status === "loading" ? "…" : "Join"}
      </button>
      <p aria-live="polite">
        {status === "error" && "Please enter a valid email address."}
        {status === "success" && "Welcome to our little corner."}
      </p>
    </form>
  );
}
