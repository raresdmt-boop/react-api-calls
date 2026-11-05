import {useState} from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex1dEmails() {
  const [users, setUsers] = useState<User[] | null>(null);

  async function loadEmails() {
    const response = await fetch("users-api/api/users");
    const json: User[] = await response.json();
    setUsers(json);
  }

  return (
      <div>
        <button onClick={() => loadEmails()}>
          Emailurile
        </button>
        {
            users !== null && (
                <ul>{users.map(user => (
                    <li key={user.id}>
                      {user.email}
                    </li>
                ))}
                </ul>
            )
        }
      </div>
  )
};

