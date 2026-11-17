
import { useState } from "react";

type ProductsResponse = {
  totalElements: number;
};

export default function Ex8bProducts() {
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function login(): Promise<void> {
    const response = await fetch("/shop-api/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@shop.com",
        password: "admin1234"
      }),
    });

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

    if (response.ok) {
      const data: ProductsResponse = await response.json();
      setResult(`${response.status}: ${data.totalElements} produse`);
    } else {
      setResult(`${response.status}: fără acces`);
    }
  }

  return (
      <>
        <h1>Produsele cu token</h1>

        <button onClick={() => login()}>Login</button>
        <button onClick={() => getProducts()}>Produse</button>

        <p>{result}</p>
      </>
  );
}
