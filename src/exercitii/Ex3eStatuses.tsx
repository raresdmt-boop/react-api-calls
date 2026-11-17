
import { useState } from "react";

export default function Ex3eStatuses() {
  const [status, setStatus] = useState<number | null>(null);

  async function call(url: string): Promise<void> {
    const response = await fetch(url);
    setStatus(response.status);
  }

  return (
      <>
        <h2>Statusul pe ecran</h2>

        <button onClick={() => call("/users-api/api/users")}>
          Status 200
        </button>

        <button
            onClick={() =>
                call("/users-api/api/users/by-email?email=nimeni@mycode.ro")
            }
        >
          Status 404
        </button>

        <button
            onClick={() =>
                call("/users-api/api/users/older-than?age=abc")
            }
        >
          Status 400
        </button>

        {status !== null && <p>Status: {status}</p>}
      </>
  );
}
