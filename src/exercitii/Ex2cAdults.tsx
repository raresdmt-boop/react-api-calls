import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export default function Ex2cAdults() {
  const [users, setUsers] = useState<User[]>([]);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users/adults");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        <h2>Adulți: {users.length}</h2>

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