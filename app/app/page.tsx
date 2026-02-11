"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  };

  const addUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1>Users</h1>
      <div className="flex gap-5">
        <input
          className="border border-white rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-white rounded py-1 px-4 text-black"
        >
          Add
        </button>
      </div>
      <ul className="bg-white text-black p-5 rounded">
        {users.map((u) => (
          <li key={u.id}>
            {u.id} - {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
