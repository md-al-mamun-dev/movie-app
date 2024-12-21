"use client"
export default function ErrorBoundary({ error, reset }) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try Again</button>
      </div>
    );
  }