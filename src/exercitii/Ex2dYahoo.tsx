import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex2dYahoo() {
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch(
        "/users-api/api/users/by-domain?domain=@yahoo.com"
    );

    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        <h2>Utilizatorii de pe Yahoo</h2>

        <ul>
          {users.map((user) => (
              <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </>
  );
}