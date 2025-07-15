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
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="py-8 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-800">Our Projects</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 px-2 sm:px-8 pb-4 hide-scrollbar snap-x snap-mandatory">
          {projects.map((project) => {
            const isLong = project.description.length > 60;
            const isExpanded = expanded[project._id];
            return (
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
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                    {isLong && !isExpanded
                      ? project.description.slice(0, 60) + "..."
                      : project.description}
                  </p>
                  {isLong && !isExpanded && (
                    <button
                      className="mt-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition font-semibold w-fit self-center"
                      onClick={() => setExpanded(prev => ({ ...prev, [project._id]: true }))}
                    >
                      Read More
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
