"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios"; // Axios instance
import toast from "react-hot-toast";

interface User {
  _id?: string;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    try {
      await api.post("/users", form);
      toast.success("User created!");
      setForm({ name: "", email: "", password: "" });
      getUsers(); // Refresh list
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted!");
      getUsers(); // refresh
    } catch (err) {
      toast.error("Failed to delete user");
      console.log(err);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email, password: "" });
    setEditingId(user._id || null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !editingId) return;

    try {
      await api.put(`/users/${editingId}`, form);
      toast.success("User updated!");
      setForm({ name: "", email: "", password: "" });
      setEditingId(null);
      getUsers(); // refresh
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {editingId ? "Edit User" : "Create New User"}
          </h1>

          <form
            onSubmit={editingId ? handleUpdate : handleSubmit}
            className="space-y-4"
          >
            <label className="text-black">Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label className="text-black">Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label className="text-black">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {editingId ? "Update User" : "Create User"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Users List
          </h2>

          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>

                <div className="mt-3 flex gap-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id!)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
