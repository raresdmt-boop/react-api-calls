
import { useState } from "react";

type ApiError = {
  message: string;
  details: string[];
};

export default function Ex5bValidationErrors() {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<ApiError | null>(null);

  async function createUser(): Promise<void> {
    setError(null);

    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName: "Test",
        email,
        password,
        age: 20
      })
    });

    if (!response.ok) {
      const data: ApiError = await response.json();
      setError(data);
    }
  }

  return (
      <>
        <h2>Erorile 400</h2>

        <input
            type="text"
            placeholder="Prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={createUser}>Creează</button>

        {error !== null && (
            <div className="red">
              <p>{error.message}</p>

              <ul>
                {error.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
        )}
      </>
  );
}
