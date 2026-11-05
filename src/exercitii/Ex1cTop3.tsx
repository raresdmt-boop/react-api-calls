import {useState} from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex1cTop3() {

  const [users, setUsers] = useState<User[] | null>(null);

  async function getTop3ByAge(): Promise<void> {
    const response = await fetch("/users-api/api/users/top3-by-age");
    const data: User[] = await response.json();
    setUsers(data);
    }

  return (
      <div>
        <button onClick={() => getTop3ByAge()}>
          Top 3
        </button>
        { users !== null && (
            <ol>
              {users.map(user => (
                  <li key={user.id}>
                    {user.firstName} {user.lastName}, {user.age}
                  </li>
              ))}
            </ol>
        )}
      </div>
  );
}
