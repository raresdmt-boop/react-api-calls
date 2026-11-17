
import { useState } from "react";

type EmailResponse = {
  email: string;
  exists: boolean;
};

export default function Ex4dEmailExists() {
  const [email, setEmail] = useState<string>("");
  const [result, setResult] = useState<EmailResponse | null>(null);

  async function checkEmail(): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/exists?email=${encodeURIComponent(email)}`
    );

    const data: EmailResponse = await response.json();
    setResult(data);
  }

  return (
      <>
        <h2>Verifică dacă emailul există</h2>

        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Introdu emailul"
        />

        <button onClick={checkEmail}>Verifică</button>

        {result !== null && (
            <p className={result.exists ? "green" : "red"}>
              {result.email}: {result.exists ? "există" : "nu există"}
            </p>
        )}
      </>
  );
}
