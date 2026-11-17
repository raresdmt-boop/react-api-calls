
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type ApiError = {
  message: string;
};

export default function Ex6eDeleteTwice() {
  const [users, setUsers] = useState<User[]>([]);
  const [result, setResult] = useState<string>("");

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function deleteUser(id: string): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/${id}`,
        {
          method: "DELETE"
        }
    );

    if (response.ok) {
      setResult(`${response.status}: șters`);
    } else {
      const data: ApiError = await response.json();
      setResult(`${response.status}: ${data.message}`);
    }
  }

  return (
      <>
        <h2>Șterge de două ori</h2>

        <button onClick={load}>
          Reîncarcă lista
        </button>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}

                <button onClick={() => deleteUser(user.id)}>
                  Șterge
                </button>
              </li>
          ))}
        </ul>

        {result && <p>{result}</p>}
      </>
  );
}
