
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex5dAddToList() {
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function addUser(): Promise<void> {
    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password: "parola123",
        age: 20
      })
    });

    if (response.status === 201) {
      const user: User = await response.json();
      setUsers((previousUsers) => [...previousUsers, user]);
    }
  }

  return (
      <>
        <h2>Utilizatori: {users.length}</h2>

        <input
            placeholder="Prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />

        <input
            placeholder="Nume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addUser}>Adaugă</button>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName} - {user.email}
              </li>
          ))}
        </ul>
      </>
  );
}
