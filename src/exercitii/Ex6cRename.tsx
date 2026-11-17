
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function Ex6cRename() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState<string>("");

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  function chooseUser(user: User): void {
    setSelectedUser(user);
    setFirstName(user.firstName);
  }

  async function save(): Promise<void> {
    if (selectedUser === null) {
      return;
    }

    const response = await fetch(
        `/users-api/api/users/${selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName
          })
        }
    );

    if (response.ok) {
      const updated: User = await response.json();

      setUsers((previousUsers) =>
          previousUsers.map((user) =>
              user.id === updated.id ? updated : user
          )
      );

      setSelectedUser(null);
      setFirstName("");
    }
  }

  return (
      <>
        <h2>Redenumește utilizator</h2>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}

                <button onClick={() => chooseUser(user)}>
                  Alege
                </button>
              </li>
          ))}
        </ul>

        {selectedUser !== null && (
            <>
              <h3>Modifică prenumele</h3>

              <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />

              <button onClick={save}>Salvează</button>
            </>
        )}
      </>
  );
}
