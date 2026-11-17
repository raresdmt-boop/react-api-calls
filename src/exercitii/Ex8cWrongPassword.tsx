
import { useState } from "react";

export default function Ex8cWrongPassword() {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  async function login(): Promise<void> {
    const response = await fetch("/shop-api/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@shop.com",
        password: password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Logat");
      setSuccess(true);
    } else {
      setMessage(`${response.status}: ${data.message}`);
      setSuccess(false);
    }
  }

  return (
      <>
        <h1>Parolă greșită</h1>

        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => login()}>Login</button>

        <p style={{ color: success ? "green" : "red" }}>
          {message}
        </p>
      </>
  );
}
