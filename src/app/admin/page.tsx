"use client";
import { useState } from "react";
import { FaProjectDiagram, FaUsers, FaEnvelopeOpenText, FaRegListAlt } from "react-icons/fa";
import AdminProjects from "./projects/page";
import AdminClients from "./clients/page";
import AdminContacts from "./contacts/page";
import AdminNewsletter from "./newsletter/page";

const SECTIONS = [
  { key: "projects", label: "Project Management", icon: <FaProjectDiagram size={28} className="text-blue-500" /> },
  { key: "clients", label: "Client Management", icon: <FaUsers size={28} className="text-pink-500" /> },
  { key: "contacts", label: "Contact Details", icon: <FaEnvelopeOpenText size={28} className="text-orange-500" /> },
  { key: "newsletter", label: "Subscribers", icon: <FaRegListAlt size={28} className="text-green-500" /> },
];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-gray-100 p-0 sm:p-4 flex flex-col">
      <header className="w-full py-6 sm:py-8 bg-white shadow-md rounded-b-3xl mb-6 sm:mb-8 border-b border-blue-100 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-700 drop-shadow-lg tracking-tight">Admin Panel</h1>
        <p className="text-center text-blue-400 mt-1 sm:mt-2 text-base sm:text-lg font-light">Manage your projects, clients, contacts, and subscribers with ease.</p>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-0">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {SECTIONS.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow p-6 sm:p-8 border-2 border-transparent hover:border-blue-300 transition group ${activeSection === section.key ? "ring-2 ring-blue-300" : ""}`}
            >
              <div className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{section.icon}</div>
              <span className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors text-center">{section.label}</span>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[300px]">
          {!activeSection && (
            <div className="text-center text-gray-400 text-xl py-20">Select a section above to manage.</div>
          )}
          {activeSection === "projects" && <AdminProjects />}
          {activeSection === "clients" && <AdminClients />}
          {activeSection === "contacts" && <AdminContacts />}
          {activeSection === "newsletter" && <AdminNewsletter />}
        </div>
      </main>
      <footer className="mt-12 py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
      </footer>
    </div>
  );
} 