
import { useState } from "react";

type ApiError = {
  message: string;
};

export default function Ex5eClearOnSuccess() {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  async function saveUser(): Promise<void> {
    setMessage("");
    setError(false);

    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName: "Test",
        email,
        password: "parola123",
        age: 20
      })
    });

    if (response.status === 201) {
      setFirstName("");
      setEmail("");
      setMessage("Salvat");
    } else {
      const data: ApiError = await response.json();
      setError(true);
      setMessage(data.message);
    }
  }

  return (
      <>
        <h2>Golește doar la succes</h2>

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

        <button onClick={saveUser}>Salvează</button>

        {message && (
            <p style={{ color: error ? "red" : "green" }}>
              {message}
            </p>
        )}
      </>
  );
}
