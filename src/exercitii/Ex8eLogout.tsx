
import { useState } from "react";

export default function Ex8eLogout() {
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function login(): Promise<void> {
    const response = await fetch("/shop-api/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@shop.com",
        password: "admin1234"
      }),
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setToken(data.accessToken);
  }

  async function getProducts(): Promise<void> {
    const response = await fetch("/shop-api/api/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    setResult(`Produse: ${response.status}`);
  }

  return (
      <>
        <h1>Login / Logout</h1>

        {token === "" ? (
            <button onClick={() => login()}>
              Login
            </button>
        ) : (
            <button onClick={() => {
              setToken("");
              setResult("");
            }}>
              Logout
            </button>
        )}

        <button onClick={() => getProducts()}>
          Produse
        </button>

        <p>{result}</p>
      </>
  );
}
