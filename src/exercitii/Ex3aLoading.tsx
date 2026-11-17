import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex3aLoading() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();

    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <p>Se încarcă...</p>;
  }

  return (
      <>
        <h2>Lista utilizatorilor</h2>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
          ))}
        </ul>
      </>
  );
}