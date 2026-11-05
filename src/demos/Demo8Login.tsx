import { useState } from "react";

export default function Demo8Login() {
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function login(): Promise<void> {
    const response = await fetch("/shop-api/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@shop.com", password: "admin1234" }),
    });
    const data = await response.json();
    setToken(data.accessToken);
  }

  async function products(): Promise<void> {
    const response = await fetch("/shop-api/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResult(`${response.status}`);
  }

  return (
    <>
      <h1>Login + token</h1>
      <button onClick={products}>Produse</button>
      <button onClick={login}>Login</button>
      <p>Token: {token === "" ? "niciunul" : `${token.slice(0, 20)}...`}</p>
      <p>Răspuns la produse: {result}</p>
      <p className="hint">
        Fără token serverul răspunde 401. Login-ul e tot un POST: primești un token și îl păstrezi
        în stare. La fiecare cerere îl trimiți în header-ul Authorization, după cuvântul Bearer.
      </p>
    </>
  );
}
