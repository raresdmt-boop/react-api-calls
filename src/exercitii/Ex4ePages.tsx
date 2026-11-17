
import { useEffect, useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

type PageResponse = {
  content: User[];
  page: number;
  totalPages: number;
};

export default function Ex4ePages() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  async function load(pageNumber: number): Promise<void> {
    const response = await fetch(
        `/users-api/api/users/search?page=${pageNumber}&size=2&sort=lastName,asc`
    );

    const data: PageResponse = await response.json();

    setUsers(data.content);
    setPage(data.page);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    load(0);
  }, []);

  return (
      <>
        <h2>Utilizatori pe pagini</h2>

        <p>Pagina {page + 1} din {totalPages}</p>

        <ul>
          {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
          ))}
        </ul>

        <button
            onClick={() => load(page - 1)}
            disabled={page === 0}
        >
          Înapoi
        </button>

        <button
            onClick={() => load(page + 1)}
            disabled={page >= totalPages - 1}
        >
          Înainte
        </button>
      </>
  );
}
