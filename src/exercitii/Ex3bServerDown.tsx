import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex3bServerDown() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  async function load(): Promise<void> {
    try {
      const response = await fetch("/users-api/api/users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch {
      setError("Serverul nu răspunde. Pornește backend-ul.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        <h2>Lista utilizatorilor</h2>

        {error && <p className="error">{error}</p>}

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
          ))}
        </ul>
      </>
  );
}