import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Demo6PatchDelete() {
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function older(user: User): Promise<void> {
    const response = await fetch(`/users-api/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age: user.age + 1 }),
    });
    const updated: User = await response.json();
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  }

  async function remove(id: string): Promise<void> {
    const response = await fetch(`/users-api/api/users/${id}`, { method: "DELETE" });
    if (response.ok) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }

  return (
    <>
      <h1>PATCH și DELETE</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}, {user.age} ani{" "}
            <button onClick={() => older(user)}>+1 an</button>
            <button onClick={() => remove(user.id)}>Șterge</button>
          </li>
        ))}
      </ul>
      <p className="hint">
        PATCH trimite doar câmpul schimbat. Serverul întoarce userul actualizat și îl pui în listă
        cu map; la DELETE îl scoți cu filter. Reîncarcă pagina: schimbările au rămas în baza de date.
      </p>
    </>
  );
}
