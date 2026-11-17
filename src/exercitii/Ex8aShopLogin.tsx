import {useState} from "react";

export default function Ex8aShopLogin() {
  const [email, setEmail] = useState<string>("admin@shop.com");
  const [password, setPassword] = useState<string>("admin1234")
  const [token, setToken] = useState<string>("");

  async function login(email: string, password: string): Promise<void> {

    const response = await fetch("/shop-api/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password}),
    });

    const data = await response.json();
    setToken(data.accessToken);
  }


  return (
      <>
        <h1> Login + Token</h1>

        <input
          type="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          ></input>
        <input
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <button onClick={() => login(email, password)}>Login</button>

        <div>
          {token !== "" && (
              <>
                <p>Logat ca: {email}</p>
                <p>Token: {token.slice(0, 20)}</p>
              </>
          )}
        </div>
      </>
  );
}
