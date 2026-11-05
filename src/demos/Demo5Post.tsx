import { useState } from "react";

type ApiError = {
  status: number;
  message: string;
  details: string[];
};

export default function Demo5Post() {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function create(): Promise<void> {
    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName: "Demo", email, password: "parola123", age: 20 }),
    });
    if (response.ok) {
      const created = await response.json();
      setMessage(`${response.status}: creat cu id ${created.id}`);
    } else {
      const error: ApiError = await response.json();
      setMessage(`${response.status}: ${error.message} ${error.details.join(", ")}`);
    }
  }

  return (
    <>
      <h1>POST cu body JSON</h1>
      <input placeholder="Prenume" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={create}>Creează</button>
      <p>{message}</p>
      <p className="hint">
        method spune ce faci, body e obiectul transformat în text cu JSON.stringify, iar header-ul
        Content-Type îi spune serverului că e JSON. Încearcă: prenume gol (400), același email de
        două ori (409).
      </p>
    </>
  );
}
