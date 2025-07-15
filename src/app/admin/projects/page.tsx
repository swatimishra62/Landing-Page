"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const fetchProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");
    setLoading(true);
    try {
      // Use FileReader to convert image to base64
      const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const imageUrl = await toBase64(image);
      await axios.post("/api/projects", { name, description, image: imageUrl });
      setName("");
      setDescription("");
      setImage(null);
      fetchProjects();
    } catch (err) {
      console.log(err)
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await axios.delete('/api/projects', { data: { id } });
    fetchProjects();
  };

  const handleEdit = (proj: Project) => {
    setEditId(proj._id);
    setEditName(proj.name);
    setEditDescription(proj.description);
    setEditImagePreview(proj.image);
    setEditImage(null);
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditImage(file);
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

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = editImagePreview;
      if (editImage) {
        // Use FileReader to convert image to base64
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        imageUrl = await toBase64(editImage);
      }
      await axios.put(`/api/projects/${editId}`, {
        name: editName,
        description: editDescription,
        image: imageUrl,
      });
      setEditId(null);
      setEditName("");
      setEditDescription("");
      setEditImage(null);
      setEditImagePreview(null);
      fetchProjects();
    } catch (err) {
      console.log(err)
      alert("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName("");
    setEditDescription("");
    setEditImage(null);
    setEditImagePreview(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Project Management</h2>
      <form onSubmit={handleAddProject} className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded skew-x-[-20deg]"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-2 border rounded skew-x-[-20deg]"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
          className="p-2 border rounded skew-x-[-20deg]"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-4">All Projects</h3>
        <ul className="space-y-4">
          {projects.map(proj => (
            <li key={proj._id} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded shadow">
              {editId === proj._id ? (
                <form onSubmit={handleEditSave} className="flex-1 flex flex-col sm:flex-row gap-4 items-center w-full">
                  <div className="flex flex-col items-center">
                    <img src={editImagePreview || proj.image} alt={proj.name} className="w-20 h-16 object-cover rounded mb-2" />
                    <input type="file" accept="image/*" onChange={handleEditImageChange} className="p-1 border rounded" />
                  </div>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="p-2 border rounded w-full" required />
                  <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="p-2 border rounded w-full" required />
                  <div className="flex flex-col gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>Save</button>
                    <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={handleEditCancel}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <img src={proj.image} alt={proj.name} className="w-20 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-bold">{proj.name}</div>
                    <div className="text-sm text-gray-600">{proj.description}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(proj)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(proj._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 