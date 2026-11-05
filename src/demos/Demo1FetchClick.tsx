import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Demo1FetchClick() {
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  return (
    <>
      <h1>fetch la click</h1>
      <button onClick={load}>Încarcă utilizatorii</button>
      <p>Am primit {users.length} utilizatori.</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
      <p className="hint">
        fetch trimite cererea și întoarce un răspuns; await așteaptă răspunsul, iar response.json()
        transformă corpul lui în obiecte. Abia apoi setUsers redesenează lista.
      </p>
    </>
  );
}
