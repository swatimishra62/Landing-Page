/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useForm } from "react-hook-form";
import NewsletterSection from "./newsletter/NewsletterSection";
import ProjectsSection from "./project/page";
import ClientsSection from "./clients/page";

export default function LandingPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    // You can connect this to your backend as needed
    alert("Submitted Successfully");
  };

  return (
    <>
      <div className="p-8">
        <ProjectsSection />
        <ClientsSection />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-4 max-w-md mx-auto">
          <input {...register("name")} placeholder="Full Name" className="p-2 border rounded" />
          <input {...register("email")} placeholder="Email Address" className="p-2 border rounded" />
          <input {...register("mobile")} placeholder="Mobile Number" className="p-2 border rounded" />
          <input {...register("city")} placeholder="City" className="p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Submit</button>
        </form>
      </div>
      <NewsletterSection />
    </>
  );
}
