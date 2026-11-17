
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex4cBetweenAges() {
  const [minAge, setMinAge] = useState<number>(18);
  const [maxAge, setMaxAge] = useState<number>(30);
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/between-ages?minAge=${minAge}&maxAge=${maxAge}`
    );

    const data: User[] = await response.json();
    setUsers(data);
  }

  return (
      <>
        <h2>Utilizatori între două vârste</h2>

        <input
            type="number"
            value={minAge}
            onChange={(e) => setMinAge(Number(e.target.value))}
        />

        <input
            type="number"
            value={maxAge}
            onChange={(e) => setMaxAge(Number(e.target.value))}
        />

        <button onClick={load}>Caută</button>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}, {user.age} ani
              </li>
          ))}
        </ul>
      </>
  );
}
