"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/contacts").then(res => {
      setContacts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Form Details</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id} className="border-t">
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  <td className="p-3">{contact.mobile}</td>
                  <td className="p-3">{contact.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 