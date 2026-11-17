
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function Ex6aDelete() {
  const [users, setUsers] = useState<User[]>([]);

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
      setUsers((previousUsers) =>
          previousUsers.filter((user) => user.id !== id)
      );
    }
  }

  return (
      <>
        <h2>Utilizatori: {users.length}</h2>

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
      </>
  );
}
