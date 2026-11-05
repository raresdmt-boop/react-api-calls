import {useState} from "react";

export default function Ex1eMinors() {

  const [count, setCount] = useState<number | null>(null);

  async function countMinors(): Promise<void> {
    const result = await fetch("/users-api/api/users/count?youngerThan=18")
    const data = await result.json()
    setCount(data.count)
  }

  return (
      <div>
        <button onClick={countMinors}>
          Câți minori?
        </button>
        {
          count !== null && (
              <p>Minori: {count}</p>
            )
        }
      </div>
  );
}
