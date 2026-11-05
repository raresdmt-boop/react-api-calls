import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Demo4Params() {
  const [age, setAge] = useState<number>(25);
  const [users, setUsers] = useState<User[]>([]);

  async function search(): Promise<void> {
    const response = await fetch(`/users-api/api/users/older-than?age=${age}`);
    const data: User[] = await response.json();
    setUsers(data);
  }

  return (
    <>
      <h1>Parametri în URL</h1>
      <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <button onClick={search}>Mai în vârstă decât {age}</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}, {user.age} ani
          </li>
        ))}
      </ul>
      <p className="hint">
        Parametrul intră în URL după „?”: nume=valoare. Mai mulți se leagă cu „&”:
        /between-ages?minAge=18&maxAge=30.
      </p>
    </>
  );
}
