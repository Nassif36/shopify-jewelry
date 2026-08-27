"use client";

export default function ErrorPage({ reset }) {
  return (
    <div className="errorPage">
      <p className="eyebrow">Something went quiet</p>
      <h1>We couldn&apos;t find that sparkle.</h1>
      <p>Please try again in a moment.</p>
      <button className="button dark" onClick={reset}>Try again</button>
    </div>
  );
}
