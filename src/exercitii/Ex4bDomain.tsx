
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex4bDomain() {
  const [domain, setDomain] = useState<string>("@gmail.com");
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/by-domain?domain=${encodeURIComponent(domain)}`
    );

    const data: User[] = await response.json();
    setUsers(data);
  }

  return (
      <>
        <h2>Caută utilizatori după domeniu</h2>

        <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
        />

        <button onClick={load}>Caută</button>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.email}
              </li>
          ))}
        </ul>
      </>
  );
}
