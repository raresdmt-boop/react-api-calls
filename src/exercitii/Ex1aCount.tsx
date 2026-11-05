import {useState} from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export default function Ex1aCount() {


  const [count, setCount] = useState<number | null>(null);

  async function load(): Promise<void> {
    const response = await fetch("/users-api/api/users");
    const data: User[] = await response.json();
    setCount(data.length);
  }


  return (
      <>
        <button onClick={() => load()}>
          Câți utilizatori?
        </button>

        {count !== null && (
            <p>Sunt {count} utilizatori.</p>)
        }
      </>
  );
}
