
/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import { useState } from "react";
import ProjectsSection from "../landing/project/page";
import ClientsSection from "../landing/clients/page";
import NewsletterSection from "../landing/newsletter/NewsletterSection";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaProjectDiagram, FaUsers, FaRegListAlt, FaEnvelopeOpenText } from "react-icons/fa";


const SECTIONS = [
  { key: "projects", label: "Our Projects", icon: <FaProjectDiagram size={32} className="text-blue-500" /> },
  { key: "clients", label: "Happy Clients", icon: <FaUsers size={32} className="text-pink-500" /> },
  { key: "newsletter", label: "Newsletter", icon: <FaRegListAlt size={32} className="text-green-500" /> },
  { key: "contact", label: "Contact", icon: <FaEnvelopeOpenText size={32} className="text-orange-500" /> },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm();
  const [contactMsg, setContactMsg] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const onContactSubmit = async (data: any) => {
    setContactLoading(true);
    setContactMsg("");
    try {
      await axios.post("/api/contacts", data);
      setContactMsg("Your message has been submitted!");
      reset();
    } catch (err) {
      console.log(err)
      setContactMsg("Failed to submit form.");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-0 sm:p-8 flex flex-col">
      <header className="w-full max-w-3xl mx-auto text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg text-blue-700">Welcome</h1>
        <p className="text-lg md:text-xl font-light mb-8 text-gray-600">Explore our projects, meet our clients, subscribe to our newsletter, or contact us!</p>
      </header>
      <main className="flex-1 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 px-4">
          {SECTIONS.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-400 transition group ${activeSection === section.key ? "ring-2 ring-blue-400" : ""}`}
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">{section.icon}</div>
              <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-center">{section.label}</span>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-2xl p-8 min-h-[300px]">
          {!activeSection && (
            <div className="text-center text-gray-400 text-xl py-20">Please select a section above.</div>
          )}
          {activeSection === "projects" && <ProjectsSection />}
          {activeSection === "clients" && <ClientsSection />}
          {activeSection === "newsletter" && <NewsletterSection />}
          {activeSection === "contact" && (
            <div className="max-w-lg mx-auto bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-100 rounded-2xl shadow-lg p-5 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-orange-600 flex items-center justify-center gap-2">
                <FaEnvelopeOpenText className="inline-block text-orange-400" /> Contact Us
              </h2>
              <form onSubmit={handleSubmit(onContactSubmit)} className="space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input {...register("name")} placeholder="Full Name" className="w-full sm:w-1/2 p-3 rounded border border-gray-200 outline-none text-black shadow-sm focus:ring-2 focus:ring-orange-200 text-sm" required />
                  <input {...register("email")} placeholder="Email Address" type="email" className="w-full sm:w-1/2 p-3 rounded border border-gray-200 outline-none text-black shadow-sm focus:ring-2 focus:ring-orange-200 text-sm" required />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input {...register("mobile")} placeholder="Mobile Number" type="tel" className="w-full sm:w-1/2 p-3 rounded border border-gray-200 outline-none text-black shadow-sm focus:ring-2 focus:ring-orange-200 text-sm" required />
                  <input {...register("city")} placeholder="City" className="w-full sm:w-1/2 p-3 rounded border border-gray-200 outline-none text-black shadow-sm focus:ring-2 focus:ring-orange-200 text-sm" required />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold py-3 rounded shadow-lg transition text-sm sm:text-base" disabled={contactLoading}>
                  {contactLoading ? "Submitting..." : "Send Message"}
                </button>
              </form>
              {contactMsg && <p className="mt-4 sm:mt-6 text-center text-green-600 text-base sm:text-lg font-semibold">{contactMsg}</p>}
            </div>
          )}
        </div>
      </main>
    
    </div>
  );
} 