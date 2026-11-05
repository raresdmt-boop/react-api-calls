import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Demo2UseEffect() {
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    console.log("cerere trimisă");
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h1>useEffect la pornire</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}, {user.age} ani
          </li>
        ))}
      </ul>
      <p className="hint">
        useEffect rulează funcția după ce componenta a apărut pe ecran. [] = o singură dată, la
        pornire. În consolă „cerere trimisă” apare de 2 ori: în modul dev, StrictMode pornește
        componenta de două ori ca să prindă greșelile.
      </p>
    </>
  );
}
