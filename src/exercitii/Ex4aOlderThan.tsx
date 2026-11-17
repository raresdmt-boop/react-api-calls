
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex4aOlderThan() {
  const [age, setAge] = useState<number>(20);
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/older-than?age=${age}`
    );

    const data: User[] = await response.json();
    setUsers(data);
  }

  return (
      <>
        <h2>Mai în vârstă decât</h2>

        <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
        />

        <button onClick={load}>Caută</button>

        <h3>Găsiți: {users.length}</h3>

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
