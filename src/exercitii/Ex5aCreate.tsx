
import { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function Ex5aCreate() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<number>(20);
  const [result, setResult] = useState<string>("");

  async function createUser(): Promise<void> {
    const response = await fetch("/users-api/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        age
      })
    });

    if (response.status === 201) {
      const user: User = await response.json();

      setResult(
          `Creat: ${user.firstName} ${user.lastName} (${user.id})`
      );
    } else {
      setResult(`Status: ${response.status}`);
    }
  }

  return (
      <>
        <h2>Creează un utilizator</h2>

        <input
            type="text"
            placeholder="Prenume"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Nume"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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

        <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
        />

        <button onClick={createUser}>Creează</button>

        {result && <p>{result}</p>}
      </>
  );
}
