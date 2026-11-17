import {useEffect, useState} from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex6bYounger() {

  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const json = await response.json();
    setUsers(json);
  }

  useEffect(() => {
    load();
  }, []);

  async function makeYounger(user: User): Promise<void> {
    const response = await fetch(`/users-api/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age: user.age - 1,
      }),
    });
    if (response.ok) {
      const updated: User = await response.json();

      setUsers((previousUsers) =>
          previousUsers.map((u) =>
              u.id === user.id ? updated : u
          )
      );
    }
  }

  return (
      <>
        <h2>Utilizatori: {users.length}</h2>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName},
                {" "}{user.age} ani

                <button onClick={() => makeYounger(user)}
                        disabled={user.age <= 1}>
                  -1 an
                </button>
              </li>
          ))}
        </ul>
      </>
  );
}
