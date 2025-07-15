/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect } from "react";
import axios from "axios";


interface Client {
  image: string;
  name: string;
  description: string;
  designation: string;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    image: "",
    name: "",
    description: "",
    designation: "",
  });
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    designation: "",
    image: "",
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const fetchClients = async () => {
    const res = await axios.get("/api/clients");
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageToSave = imagePreview || "";
      await axios.post("/api/clients", {
        name: form.name,
        description: form.description,
        designation: form.designation,
        image: imageToSave,
      });
      setForm({ image: "", name: "", description: "", designation: "" });
      setImageFile(null);
      setImagePreview(null);
      fetchClients();
    } catch (err) {
      console.log(err)
      alert("Failed to add client");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client: any, idx: number) => {
    setEditIdx(idx);
    setEditForm({
      name: client.name,
      description: client.description,
      designation: client.designation,
      image: client.image,
    });
    setEditImagePreview(client.image);
    setEditImageFile(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setEditImagePreview(null);
    }
  };

  const handleEditSave = async (id: string) => {
    setLoading(true);
    try {
      const imageToSave = editImageFile ? editImagePreview : editForm.image;
      await axios.put("/api/clients", {
        id,
        name: editForm.name,
        description: editForm.description,
        designation: editForm.designation,
        image: imageToSave,
      });
      setEditIdx(null);
      setEditForm({ name: "", description: "", designation: "", image: "" });
      setEditImageFile(null);
      setEditImagePreview(null);
      fetchClients();
    } catch (err) {
      console.log(err)
      alert("Failed to update client");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditForm({ name: "", description: "", designation: "", image: "" });
    setEditImageFile(null);
    setEditImagePreview(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return;
    setLoading(true);
    try {
      await axios.delete("/api/clients", { data: { id } });
      fetchClients();
    } catch (err) {
      console.log(err)
      alert("Failed to delete client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Client Management</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border rounded  skew-x-[-20deg]"
          required
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto" />
        )}
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded skew-x-[-20deg]"
          required
        />
        <textarea
          name="description"
          placeholder="Client Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded  skew-x-[-20deg]"
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Client Designation (e.g., CEO, Designer)"
          value={form.designation}
          onChange={handleChange}
          className="p-2 border rounded skew-x-[-20deg]"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-4">All Clients</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client: any, idx: number) => (
            <div key={idx} className="bg-white border rounded-lg p-6 text-center shadow hover:shadow-md transition">
              {editIdx === idx ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleEditSave(client._id);
                  }}
                  className="flex flex-col gap-2 items-center"
                >
                  <img src={editImagePreview || client.image} alt={client.name} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                  <input type="file" accept="image/*" onChange={handleEditImageChange} className="p-1 border rounded" />
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="p-2 border rounded w-full" required />
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} className="p-2 border rounded w-full" required />
                  <input type="text" name="designation" value={editForm.designation} onChange={handleEditChange} className="p-2 border rounded w-full" required />
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>Save</button>
                    <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-sm text-gray-600 mb-3">{client.description}</p>
                  <p className="font-semibold text-blue-600 underline">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.designation}</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <button onClick={() => handleEdit(client, idx)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(client._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 