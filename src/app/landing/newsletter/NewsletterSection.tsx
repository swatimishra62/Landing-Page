"use client";
import { useState, useRef } from "react";
import axios from "axios";


export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      await axios.post("/api/newsletter", { email });
      setMessage("Subscribed successfully!");
      setIsError(false);
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
      inputRef.current?.focus();
    } catch (err) {
      console.log(err)
      setMessage("Subscription failed. Try again.");
      setIsError(true);
      setTimeout(() => setMessage(""), 3000);
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row items-center justify-center bg-blue-600 py-4 px-2 sm:px-8 rounded shadow mt-8 gap-3 sm:gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md" aria-label="Newsletter Subscription Form">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email Address"
          className="p-2 rounded text-black focus:outline-none w-full sm:w-56 text-sm"
          required
          aria-label="Email address"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition w-full sm:w-auto text-sm"
          disabled={loading}
          aria-label="Subscribe"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <div className={`text-sm flex items-center gap-2 ${isError ? "text-red-200" : "text-green-200"}`}>
          {isError ? (
            <span aria-label="Error" role="img">❌</span>
          ) : (
            <span aria-label="Success" role="img">✅</span>
          )}
          <span>{message}</span>
        </div>
      )}
    </nav>
  );
} 