"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="py-8 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-800">Our Projects</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 px-2 sm:px-8 pb-4 hide-scrollbar snap-x snap-mandatory">
          {projects.map((project) => (
            <div
              key={project._id}
              className="min-w-[220px] max-w-[90vw] sm:min-w-[270px] sm:max-w-[320px] bg-white border rounded-2xl shadow-lg flex flex-col items-center snap-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-200"
              style={{ minHeight: 320 }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-32 sm:h-40 object-cover rounded-t-2xl transition-all duration-300"
                style={{ maxHeight: 180 }}
              />
              <div className="p-3 sm:p-4 flex-1 flex flex-col w-full">
                <h3 className="text-blue-700 font-bold text-base sm:text-lg mb-2 truncate">{project.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
                <button
                  className="mt-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 sm:px-4 py-2 rounded shadow hover:from-blue-600 hover:to-indigo-600 transition font-semibold w-full text-xs sm:text-base"
                  onClick={() => alert(`Read more about: ${project.name}`)}
                >
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
