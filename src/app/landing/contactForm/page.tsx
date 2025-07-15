

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/contacts", data);
      alert("Your message has been submitted!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#4b589c] text-white p-8 rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Get a Free Consultation</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Full Name"
          className="w-full p-3 rounded border-none outline-none text-black"
          required
        />
        <input
          {...register("email")}
          placeholder="Enter Email Address"
          type="email"
          className="w-full p-3 rounded border-none outline-none text-black"
          required
        />
        <input
          {...register("mobile")}
          placeholder="Mobile Number"
          type="tel"
          className="w-full p-3 rounded border-none outline-none text-black"
          required
        />
        <input
          {...register("city")}
          placeholder="Area, City"
          className="w-full p-3 rounded border-none outline-none text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded"
        >
          Get Quick Quote
        </button>
      </form>
    </div>
  );
}
