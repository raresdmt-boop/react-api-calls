import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type ApiError = {
  status: number;
  message: string;
};

export default function Demo3LoadingError() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function load(url: string): Promise<void> {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const body: ApiError = await response.json();
        setError(`${response.status}: ${body.message}`);
        setUsers([]);
        return;
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch {
      setError("Serverul nu răspunde. Ai pornit backend-ul?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load("/users-api/api/users");
  }, []);

  return (
    <>
      <h1>Se încarcă / eroare</h1>
      <button onClick={() => load("/users-api/api/users")}>Toți utilizatorii</button>
      <button onClick={() => load("/users-api/api/users/by-email?email=nimeni@mycode.ro")}>
        Un email inexistent
      </button>
      {loading && <p>Se încarcă...</p>}
      {error !== "" && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
      <p className="hint">
        response.ok e false la 4xx și 5xx, dar fetch NU aruncă eroare: tu verifici. catch prinde
        doar cazul în care serverul nici nu răspunde. finally rulează în ambele cazuri.
      </p>
    </>
  );
}
