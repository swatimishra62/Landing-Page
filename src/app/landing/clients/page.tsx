"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    axios.get("/api/clients").then((res) => setClients(res.data));
  }, []);

  return (
    <div className="py-8 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-800">Happy Clients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 px-2 sm:px-8">
        {clients.map((client) => (
          <div
            key={client._id}
            className="bg-white border rounded-lg p-4 sm:p-6 text-center shadow hover:shadow-md transition flex flex-col items-center"
          >
            <img
              src={client.image}
              alt={client.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 object-cover"
            />
            <p className="text-sm text-gray-600 mb-2 sm:mb-3">{client.description}</p>
            <p className="font-semibold text-blue-600 text-base sm:text-lg">{client.name}</p>
            <p className="text-xs sm:text-sm text-gray-500">{client.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
