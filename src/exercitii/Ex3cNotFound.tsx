
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

type ApiError = {
  status: number;
  message: string;
};

export default function Ex3cNotFound() {
  const [email, setEmail] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function search(): Promise<void> {
    setResult("");
    setError("");

    try {
      const response = await fetch(
          `/users-api/api/users/by-email?email=${encodeURIComponent(email)}`
      );

      if (response.ok) {
        const data: User = await response.json();
        setResult(`${data.firstName} ${data.lastName}`);
      } else {
        const data: ApiError = await response.json();
        setError(`${response.status}: ${data.message}`);
      }
    } catch {
      setError("Serverul nu răspunde.");
    }
  }

  return (
      <>
        <h2>Caută utilizator după email</h2>

        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introdu emailul"
        />

        <button onClick={search}>Caută</button>

        {result && <p>{result}</p>}

        {error && <p className="error">{error}</p>}
      </>
  );
}
