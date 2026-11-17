
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

type ApiError = {
  message: string;
  details: string[];
};

export default function Ex6dPassword() {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function changePassword(): Promise<void> {
    if (userId === "") {
      return;
    }

    setMessage("");
    setErrors([]);

    const response = await fetch(
        `/users-api/api/users/${userId}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            newPassword
          })
        }
    );

    if (response.ok) {
      setMessage("Parola a fost schimbată");
      setNewPassword("");
    } else if (response.status === 400) {
      const data: ApiError = await response.json();
      setMessage(data.message);
      setErrors(data.details);
    }
  }

  return (
      <>
        <h2>Schimbă parola</h2>

        <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Alege utilizatorul</option>

          {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
          ))}
        </select>

        <input
            type="password"
            placeholder="Parola nouă"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={changePassword}>
          Schimbă
        </button>

        {message && <p>{message}</p>}

        {errors.length > 0 && (
            <ul className="red">
              {errors.map((error, index) => (
                  <li key={index}>{error}</li>
              ))}
            </ul>
        )}
      </>
  );
}
