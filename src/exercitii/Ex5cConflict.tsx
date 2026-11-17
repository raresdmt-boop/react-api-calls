
import { useState } from "react";

type ApiError = {
  message: string;
};

export default function Ex5cConflict() {
  const [email, setEmail] = useState<string>(
      "ana.stefanescu@yahoo.com"
  );
  const [error, setError] = useState<string>("");

  async function createUser(): Promise<void> {
    setError("");

    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: "Ion",
        lastName: "Pop",
        email,
        password: "parola123",
        age: 20
      })
    });

    if (response.status === 409) {
      const data: ApiError = await response.json();
      setError(`Emailul e deja folosit: ${data.message}`);
    }
  }

  return (
      <>
        <h2>Email deja folosit</h2>

        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={createUser}>Creează</button>

        {error && <p className="red">{error}</p>}
      </>
  );
}
