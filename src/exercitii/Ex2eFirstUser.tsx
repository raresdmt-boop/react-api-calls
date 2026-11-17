import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex2eFirstUser() {
  const [user, setUser] = useState<User | null>(null);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();

    if (data.length > 0) {
      setUser(data[0]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        {user === null ? (
            <p>Niciun utilizator</p>
        ) : (
            <div className="card">
              <h2>{user.firstName} {user.lastName}</h2>
              <p>{user.email}</p>
              <p>{user.age} ani</p>
            </div>
        )}
      </>
  );
}