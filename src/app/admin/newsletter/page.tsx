/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";

export default function AdminNewsletter() {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newsletter")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEmails(data.map((item: any) => item.email));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Newsletter Subscribers</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : emails.length === 0 ? (
        <div className="text-center text-gray-600">No subscribers found.</div>
      ) : (
        <ul className="space-y-2">
          {emails.map((email, idx) => (
            <li key={idx} className="text-center text-blue-700 font-mono border-b last:border-b-0 py-2">{email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
